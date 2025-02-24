import { useEffect } from "react";

import { addMarker } from "../map.utils.js";

import FindMe from "./FindMe.jsx";
import MapForm from "./MapForm.jsx";
import MarkerList from "./MarkerList.jsx";
import Clipboard from "./Clipboard.jsx";
import GoogleMap from "./GoogleMap.jsx";

import "../styles/map.css";

import useDocumentTitle from "../hooks/useDocumentTitle.js";
import useQueryParams from "../hooks/useQueryParams.js";

import { MapProvider } from "../context/Map.jsx";

// show map and markers list  side by side
// go to marker on click

const MyMap = () => {
	useDocumentTitle(`Your current location is: ${location.name}`);

	const [lat, setLat] = useQueryParams("lat", "");
	const [lng, setLng] = useQueryParams("lng", "");

	useEffect(() => {
		if (lat !== "" && lng !== "") {
			const coords = {
				lat: Number.parseFloat(lat),
				lng: Number.parseFloat(lng),
			};
			addMarker(coords, map, "Hi there!");
		}
	}, [lat, lng]);

	return (
		<>
			<MapProvider>
				<div className="sidebar">
					<div className="card">
						<FindMe />
					</div>

					<div className="card">
						<MapForm />
					</div>

					<div className="card">
						<Clipboard />
					</div>

					<div className="card">
						<MarkerList />
					</div>
				</div>

				<div className="app-container">
					<GoogleMap />
				</div>
			</MapProvider>
		</>
	);
};

export default MyMap;
