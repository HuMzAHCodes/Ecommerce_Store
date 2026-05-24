import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ThemeProvider from "./theme/ThemeProvider.tsx";
import "./index.css";
import { ToastProvider } from "./components/ui/Toast.tsx";

//  Change ONE word here to switch the entire app's theme:
//    "blushAndSlate" | "midnightLuxe" | "frostAndCoral"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme="blushAndSlate">
      <ToastProvider>
    <App />
  </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>
);
