import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import "./index.css";
import * as ReactDOM from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
