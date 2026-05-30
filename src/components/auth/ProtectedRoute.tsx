import { type ReactNode } from "react";
import { useAuth as useClerkAuth } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";
import { useTheme } from "../../theme/ThemeContext";

// ── Types ─────────────────────────────────────────────────────

interface ProtectedRouteProps {
  children: ReactNode;
}

// ── Sub-components ────────────────────────────────────────────

const LoadingSpinner = () => {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <div
      style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        minHeight:      "60vh",
      }}
    >
      <div
        style={{
          width:          34,
          height:         34,
          borderRadius:   "50%",
          border:         `3px solid ${colors.borderLight}`,
          borderTopColor: colors.accentPrimary,
          animation:      "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

// ── Component ─────────────────────────────────────────────────

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isSignedIn, isLoaded } = useClerkAuth();
  const location                 = useLocation();

  // Still hydrating Clerk session — show spinner briefly
  const isHydrating = !isLoaded;
  if (isHydrating) return <LoadingSpinner />;

  // Not signed in — redirect to login, preserve intended destination
  const isUnauthenticated = !isSignedIn;
  if (isUnauthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
