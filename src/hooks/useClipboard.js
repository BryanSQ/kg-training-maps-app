import { useCallback, useState } from "react";

const useClipboard = () => {
	const [text, setText] = useState(null);

	const copy = useCallback(async (newText) => {
		if (!navigator?.clipboard) {
			console.warn("Clipboard not supported");
			return false;
		}

		// Try to save to clipboard then save it in the state if worked
		try {
			await navigator.clipboard.writeText(newText);
			setText(newText);
			return true;
		} catch (error) {
			console.warn("Copy failed", error);
			setText(null);
			return false;
		}
	}, []);

	const paste = async () => {
		const content = await navigator.clipboard.readText();
		console.log(content);
		return content;
	};

	return [text, copy, paste];
};

export default useClipboard;
