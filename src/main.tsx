// import React from "react";
// import ReactDOM from "react-dom/client";
// import { ClerkProvider } from "@clerk/clerk-react";
// import App from "./App.tsx";
// import ThemeProvider from "./theme/ThemeProvider.tsx";

// import "./index.css";
// import { ToastProvider } from "./components/ui/Toast";


// import { CursorProvider, CursorDot } from "./components/cursor";
// import { useIsMobile } from "./hooks/useMediaQuery";

// const AppCursor = () => {
//   const isMobile = useIsMobile();
//   if (isMobile) return null;
//   return <CursorDot />;
// };

// // ── Clerk publishable key — set in .env ───────────────────────
// const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// const isMissingClerkKey = !CLERK_PUBLISHABLE_KEY;

// if (isMissingClerkKey) {
//   throw new Error(
//     "Missing VITE_CLERK_PUBLISHABLE_KEY — add it to your .env file.\n" +
//     "Get it from: dashboard.clerk.com → your app → API Keys"
//   );
// }

// // ── Root render ───────────────────────────────────────────────
// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <React.StrictMode>
//     <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}
//     signInUrl="/login"       // ← ADD
//   signUpUrl="/register"    // ← ADD
//   >
//       <ThemeProvider theme="blushAndSlate">
//         <ToastProvider>
//           <CursorProvider>
//             <AppCursor />
//              <App />
//           </CursorProvider>
//         </ToastProvider>
//       </ThemeProvider>
//     </ClerkProvider>
//   </React.StrictMode>
// );




import React       from "react";
import ReactDOM    from "react-dom/client";
import App         from "./App.tsx";
import ThemeProvider from "./theme/ThemeProvider.tsx";
import { AuthProvider } from "./components/auth/AuthContext.tsx"; // adjust path

import "./index.css";
import { ToastProvider } from "./components/ui/Toast";
import { CursorProvider, CursorDot } from "./components/cursor";
import { useIsMobile } from "./hooks/useMediaQuery";

const AppCursor = () => {
  const isMobile = useIsMobile();
  if (isMobile) return null;
  return <CursorDot />;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
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
  </React.StrictMode>
);
