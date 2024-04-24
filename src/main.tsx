import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ProviderRedux from "./redux/provider.tsx";
import ProviderContextLoader from "./contexts/contextLoader.tsx";
import ProviderContextAuth from "./contexts/contextAuth.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProviderRedux>
        <ProviderContextLoader>
          <ProviderContextAuth>
            <App />
          </ProviderContextAuth>
        </ProviderContextLoader>
      </ProviderRedux>
    </BrowserRouter>
  </React.StrictMode>
);
