import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.tsx";
import ThemeProvider from "./theme/ThemeProvider.tsx";
import { ToastProvider } from "./components/ui/Toast.tsx";
import "./index.css";

// ── Clerk publishable key — set in .env ───────────────────────
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const isMissingClerkKey = !CLERK_PUBLISHABLE_KEY;

if (isMissingClerkKey) {
  throw new Error(
    "Missing VITE_CLERK_PUBLISHABLE_KEY — add it to your .env file.\n" +
    "Get it from: dashboard.clerk.com → your app → API Keys"
  );
}

// ── Root render ───────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <ThemeProvider theme="blushAndSlate">
        <ToastProvider>
          <App />
        </ToastProvider>
      </ThemeProvider>
    </ClerkProvider>
  </React.StrictMode>
);
