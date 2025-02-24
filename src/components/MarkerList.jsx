import { addMarker } from "../map.utils";

import useClipboard from "../hooks/useClipboard";
import useLocalStorage from "../hooks/useLocalStorage";

import { useContext, useEffect } from "react";

import { MapContext } from "../context/Map";

const MarkerList = () => {
	const [localMarkers, setLocalMarkers] = useLocalStorage("local-markers", []);

	const { map } = useContext(MapContext);

	const { markers, setMarkers } = useContext(MapContext);

	const [copiedText, copyToClipboard] = useClipboard();

	useEffect(() => {
		// load meta-markers from localStorage and converts them into an object with a Google Advanced Marker
		const loadMarkers = async () => {
			const markersList = localMarkers.map(async (marker) => {
				const newMarker = await addMarker(marker.position, map, marker.name);
				return {
					...marker,
					marker: newMarker,
				};
			});

			const resolvedList = await Promise.all(markersList);
			setMarkers(resolvedList);
		};
		loadMarkers();
	}, [map]);

	const handleDelete = (markerId) => {
		setMarkers(markers.filter((marker) => marker.id !== markerId));
		setLocalMarkers(localMarkers.filter((marker) => marker.id !== markerId));
	};

	return (
		<section className="marker-container">
			{markers.length === 0 ? (
				<p>Try adding some markers.</p>
			) : (
				markers.map((marker) => {
					return (
						<div key={marker.id} className="marker-list-item">
							<span>
								<p>
									<strong>{marker.name}</strong>@ {marker.position.lat}-
									{marker.position.lng}
								</p>
							</span>
							<button type="button" onClick={() => handleDelete(marker.id)}>
								❌
							</button>
							<button
								type="button"
								onClick={() => copyToClipboard(JSON.stringify(marker.position))}
							>
								📋
							</button>
							<button
								type="button"
								onClick={() => {
									console.log(marker);
								}}
							>
								ℹ️
							</button>
						</div>
					);
				})
			)}
		</section>
	);
};

export default MarkerList;
