import { useState } from "react";

const getQuery = () => {
	if (typeof window !== "undefined") {
		return new URLSearchParams(window.location.search);
	}
	return new URLSearchParams();
};

const getQueryStringVal = (key) => {
	return getQuery().get(key);
};

const useQueryParams = (key, defaultVal) => {
	const [query, setQuery] = useState(getQueryStringVal(key) || defaultVal);

	const updateUrl = (newVal) => {
		setQuery(newVal);

		const query = getQuery();

		if (newVal.trim() !== "") {
			query.set(key, newVal);
		} else {
			query.delete(key);
		}
	};

	return [query, updateUrl];
};

export default useQueryParams;
