import { useEffect } from "react";
import "./App.css";
import GoogleMap from "./components/GoogleMap";
import MyMap from "./components/MyMap";

function App() {
	return (
		<section className="main-app-layout">
			<MyMap />
		</section>
	);
}

export default App;
