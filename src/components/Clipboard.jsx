import { useState } from "react";
import useClipboard from "../hooks/useClipboard";

const Clipboard = () => {
	const [searchbox, setSearchbox] = useState("");
	const [copiedText, copyToClipboard, paste] = useClipboard();

	const pasteToInput = async () => {
		const clipboardText = await paste();
		setSearchbox(clipboardText);
	};

	return (
		<div className="clipboard-container">
			<label>
				<input type="text" name="searchbox" value={searchbox} readOnly />
				<button onClick={() => copyToClipboard(window.location.href)}>
					Copy URL
				</button>
				<button onClick={pasteToInput}>paste</button>
			</label>
		</div>
	);
};

export default Clipboard;
