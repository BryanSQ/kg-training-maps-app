import React, { createContext, useState } from "react";

const defaultValue = {
	markers: [],
	setMarkers: () => {},
	map: null,
	setMap: () => {},
};

// 1️⃣ Create Context
export const MapContext = createContext(defaultValue);

// 2️⃣ Create Provider Component
export const MapProvider = ({ children }) => {
	const [markers, setMarkers] = useState([]);
	const [map, setMap] = useState(null);

	return (
		<MapContext.Provider value={{ markers, setMarkers, map, setMap }}>
			{children}
		</MapContext.Provider>
	);
};
