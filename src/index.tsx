import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { LoginProvider } from "./contexts/LoginContext/LoginContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <LoginProvider>
      <App />
    </LoginProvider>
  </React.StrictMode>
);
