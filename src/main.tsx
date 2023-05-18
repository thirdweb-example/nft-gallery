import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { chainConst } from "./consts/parameters";
import { getChainBySlug } from "@thirdweb-dev/chains";

const urlParams = new URL(window.location.toString()).searchParams;

const chain =
  (urlParams.get("chain") && JSON.parse(String(urlParams.get("chain")))) ||
  chainConst;

const activeChain = getChainBySlug(chain);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={activeChain}>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>,
);
