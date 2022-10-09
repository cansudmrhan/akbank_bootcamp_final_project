import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { LoginProvider } from "./contexts/LoginContext/LoginContext";
import { BoardProvider } from "./contexts/BoardContext/BoardContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <LoginProvider>
      <BoardProvider>
        <App />
      </BoardProvider>
    </LoginProvider>
  </React.StrictMode>
);
