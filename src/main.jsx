import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/variables.css";
import "./styles/cursor.css";
import "./styles/global.css";
import "./styles/cursor.css";
import "./styles/timeline.css";
import "./styles/cursor.css";

import App from "./App.jsx";
import './styles/theme-blue.css';
import "./styles/cursor.css";

import { initCustomCursor } from "./animations/cursor.animation";
initCustomCursor();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);






