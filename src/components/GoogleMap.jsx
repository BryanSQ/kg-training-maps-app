import { useContext, useEffect } from "react";

import { initMap } from "../map.utils";
import { MapContext } from "../context/Map";

const GoogleMap = () => {
	const { setMap } = useContext(MapContext);

	useEffect(() => {
		const setNewMap = async () => {
			try {
				const newMap = await initMap("map-container", "REACT_MAP_ID", {
					lat: 0,
					lng: 0,
				});
				setMap(newMap);
			} catch (error) {
				console.error(error.message);
			}
		};
		setNewMap();
	}, []);

	return <div id="map-container" />;
};

export default GoogleMap;
