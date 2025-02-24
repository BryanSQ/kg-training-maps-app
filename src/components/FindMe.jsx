import { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { MapContext } from "../context/Map";
import { geoLocationHelper, getLocationData, addMarker } from "../map.utils";

const initialLocation = {
	name: "Unknown Location.",
	coords: {
		lat: 0,
		lng: 0,
	},
};

const FindMe = () => {
	const { map } = useContext(MapContext);
	const [location, setLocation] = useLocalStorage("location", initialLocation);

	const [isLoading, setIsLoading] = useState(false);

	const searchHandler = async () => {
		setIsLoading(true);
		const { coords } = await geoLocationHelper();

		const position = {
			lat: coords.latitude,
			lng: coords.longitude,
		};

		map.setCenter(position);
		map.setZoom(13);

		getMarkerLocation(position);
	};

	const getMarkerLocation = async (position) => {
		const locationData = await getLocationData(position);
		setLocation({ name: locationData, coords: position });
		addMarker(position, map, "found you!");
		setIsLoading(false);
	};

	return (
		<div className="findme-box">
			<h2>Greetings from: {isLoading ? "Searching" : location.name}</h2>

			<button type="button" onClick={() => searchHandler()}>
				Find Me!!!
			</button>
		</div>
	);
};

export default FindMe;
