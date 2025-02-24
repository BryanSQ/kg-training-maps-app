import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { libraryLoader } from "./map.utils.js";

libraryLoader();
createRoot(document.getElementById("root")).render(<App />);
