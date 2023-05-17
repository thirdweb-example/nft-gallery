import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { chain } from "./consts/parameters";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={chain}>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>,
);
