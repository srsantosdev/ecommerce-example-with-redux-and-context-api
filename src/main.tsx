import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { EcommerceProvider } from "./useECommerce";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <EcommerceProvider>
      <App />
    </EcommerceProvider>
  </React.StrictMode>
);
