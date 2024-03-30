import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ProviderRedux from "./redux/provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProviderRedux>
        <App />
      </ProviderRedux>
    </BrowserRouter>
  </React.StrictMode>
);
