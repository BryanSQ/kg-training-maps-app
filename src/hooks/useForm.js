import { useState } from "react";

const useForm = (initialValue = "") => {
	const [value, setValue] = useState(initialValue);

	const handleChange = (event) => {
		const newValue = event.target.value;
		if (newValue === "") return;
		setValue(newValue);
	};

	return [value, handleChange];
};

export default useForm;
