const MAP_API = import.meta.env.VITE_MAPS_API_KEY;

const libraryLoader = () => {
	((g) => {
		let h,
			a,
			k,
			p = "The Google Maps JavaScript API",
			c = "google",
			l = "importLibrary",
			q = "__ib__",
			m = document,
			b = window;
		b = b[c] || (b[c] = {});
		var d = b.maps || (b.maps = {}),
			r = new Set(),
			e = new URLSearchParams(),
			u = () =>
				h ||
				(h = new Promise(async (f, n) => {
					await (a = m.createElement("script"));
					e.set("libraries", [...r] + "");
					for (k in g)
						e.set(
							k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
							g[k],
						);
					e.set("callback", c + ".maps." + q);
					a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
					d[q] = f;
					a.onerror = () => (h = n(Error(p + " could not load.")));
					a.nonce = m.querySelector("script[nonce]")?.nonce || "";
					m.head.append(a);
				}));
		d[l]
			? console.warn(p + " only loads once. Ignoring:", g)
			: (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
	})({
		key: MAP_API,
		v: "weekly",
		// Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
		// Add other bootstrap parameters as needed, using camel case.
	});
};

async function initMap(mapElementId, mapId, position = { lat: 0, lng: 0 }) {
	const { Map } = await google.maps.importLibrary("maps");

	const initialMap = new Map(document.getElementById(mapElementId), {
		zoom: 2,
		center: position,
		mapId: mapId,
	});

	return initialMap;
}

const geoLocationHelper = () => {
	if (navigator.geolocation) {
		return new Promise((res, rej) => {
			navigator.geolocation.getCurrentPosition(res, rej);
		});
	}
};

const addMarker = async (pos, map, markerTitle = "John Doe") => {
	const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
	return new AdvancedMarkerElement({
		map: map,
		position: pos,
		title: markerTitle,
	});
};

const getLocationData = async (pos) => {
	const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=${MAP_API}`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const json = await response.json();
		return json.results[0].formatted_address;
	} catch (error) {
		console.error(error.message);
	}
};

export {
	libraryLoader,
	initMap,
	geoLocationHelper,
	addMarker,
	getLocationData,
};
