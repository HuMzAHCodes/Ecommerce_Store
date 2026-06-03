// import { type ReactNode }    from "react";
// import { Navigate }          from "react-router-dom";
// import LoadingSpinner        from "./LoadingSpinner";
// import useProtectedRoute     from "./useProtectedRoute";

// // ── Types ────────────────────────────────────────────────────

// interface ProtectedRouteProps {
//   children: ReactNode;
// }

// // ── Component ────────────────────────────────────────────────

// const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   const { isHydrating, isUnauthenticated, intendedPath } = useProtectedRoute();

//   if (isHydrating)       return <LoadingSpinner />;
//   if (isUnauthenticated) return <Navigate to="/login" state={{ from: intendedPath }} replace />;

//   return <>{children}</>;
// };

// export default ProtectedRoute;





import { type ReactNode } from "react";
import { Navigate }       from "react-router-dom";
import LoadingSpinner     from "./LoadingSpinner";
import useProtectedRoute  from "./useProtectedRoute";

// ── Types ────────────────────────────────────────────────────

interface ProtectedRouteProps {
  children: ReactNode;
}

// ── Component ────────────────────────────────────────────────

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isHydrating, isUnauthenticated, intendedPath } = useProtectedRoute();

  if (isHydrating)       return <LoadingSpinner />;
  if (isUnauthenticated) return <Navigate to="/login" state={{ from: intendedPath }} replace />;

  return <>{children}</>;
};

export default ProtectedRoute;

/*
 * ── ProtectedRoute ───────────────────────────────────────────────────────────
 *
 * Identical flow to the Clerk version — only the auth source changed:
 *
 *   1. Firebase is still resolving the session  →  show LoadingSpinner
 *      (isLoaded comes from onAuthStateChanged in AuthContext)
 *
 *   2. Session resolved, user is NOT signed in  →  redirect to /login
 *      Current pathname passed as { from } so login can bounce them back.
 *
 *   3. Session resolved, user IS signed in  →  render protected children
 */


/*
 * ── ProtectedRoute — What this folder does ──────────────────────────────────
 *
 * Guards any route that requires the user to be signed in via Clerk.
 *
 * Flow:
 *   1. Clerk is still hydrating its session  →  show a centered loading spinner
 *      (avoids a flash-redirect before Clerk has even checked localStorage)
 *
 *   2. Clerk has loaded, user is NOT signed in  →  redirect to /login
 *      The current pathname is passed as { from } in router state so the login
 *      page can bounce the user back to where they were trying to go.
 *
 *   3. Clerk has loaded, user IS signed in  →  render the protected children
 *
 * Files in this folder:
 *   useProtectedRoute.ts  —  all auth-state logic (hydration + sign-in checks)
 *   LoadingSpinner.tsx    —  pure UI spinner shown during Clerk hydration
 *   spinnerStyles.ts      —  CSSProperties factories + keyframe string; no JSX
 *   ProtectedRoute.tsx    —  thin orchestrator; reads like a plain-English flow
 */