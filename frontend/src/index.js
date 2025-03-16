import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Use createRoot instead of render
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ Correct method for React 18+
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
