import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import "allotment/dist/style.css";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Toaster } from "react-hot-toast";
import theme from "./theme.ts";
import { BrowserRouter } from 'react-router'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme} withCssVariables>
        <ModalsProvider>
          <Toaster />
          <App />
        </ModalsProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
