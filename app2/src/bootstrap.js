import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root-2");
const root = createRoot(container);
root.render(<App />);
