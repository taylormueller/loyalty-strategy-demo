import React from "react";
import { createRoot } from "react-dom/client";
import LoyaltyStrategyInABox from "../LoyaltyStrategyInABox.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoyaltyStrategyInABox />
  </React.StrictMode>,
);
