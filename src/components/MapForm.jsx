import { useContext } from "react";
import { MapContext } from "../context/Map";
import { addMarker } from "../map.utils";

import useForm from "../hooks/useForm";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const MapForm = () => {
	const [name, nameChange] = useForm();
	const [lat, latChange] = useForm();
	const [lng, lngChange] = useForm();

	const { markers, setMarkers, map } = useContext(MapContext);
	const [localMarkers, setLocalMarkers] = useLocalStorage("local-markers", []);

	const handleFormSubmit = (event) => {
		event.preventDefault();

		if (name && lat && lng) {
			const userInfo = {
				name: name,
				position: {
					lat,
					lng,
				},
			};

			addUserLocation(userInfo);
		}
	};

	const addUserLocation = async (userInfo) => {
		let { name, position } = userInfo;

		position = {
			lat: Number.parseFloat(position.lat),
			lng: Number.parseFloat(position.lng),
		};

		try {
			const marker = await addMarker(position, map, name);
			map.setCenter(position);
			map.setZoom(5);
			setMarkers([...markers, { id: uuidv4(), position, name, marker }]);

			// metaMarkers do not have the Google Advanced Marker object which has circular references
			// and interfere with the JSON parsing of the markers to store on localStorage
			setLocalMarkers([...localMarkers, { id: uuidv4(), position, name }]);
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<form className="map-form-container" onSubmit={handleFormSubmit}>
			<label className="map-form-item">
				Who are you?
				<input
					name="user-name"
					type="text"
					value={name}
					onChange={nameChange}
				/>
			</label>

			<label className="map-form-item">
				Latitude:
				<input name="user-lat" type="text" value={lat} onChange={latChange} />
			</label>

			<label className="map-form-item">
				Longitude:
				<input name="user-lng" type="text" value={lng} onChange={lngChange} />
			</label>

			<button type="submit">Add new location</button>
		</form>
	);
};

export default MapForm;
