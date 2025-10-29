import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { BlockchainProvider } from "./context/BlockchainContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BlockchainProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BlockchainProvider>
  </React.StrictMode>
);
