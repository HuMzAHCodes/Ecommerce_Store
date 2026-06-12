import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ThemeProvider from "./theme/ThemeProvider.tsx";
import { AuthProvider } from "./components/auth/AuthContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import { ToastProvider } from "./components/ui/Toast";
import { CursorProvider, CursorDot } from "./components/cursor";
import { useIsMobile } from "./hooks/useMediaQuery";

const queryClient = new QueryClient();

const AppCursor = () => {
  const isMobile = useIsMobile();
  if (isMobile) return null;
  return <CursorDot />;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme="blushAndSlate">
          <ToastProvider>
            <CursorProvider>
              <AppCursor />
              <App />
            </CursorProvider>
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
