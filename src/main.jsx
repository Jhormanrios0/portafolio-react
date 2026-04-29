import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/variables.css";
import "./styles/global.css";
import "./styles/timeline.css";

import App from "./App.jsx";
import './styles/theme-blue.css';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);



