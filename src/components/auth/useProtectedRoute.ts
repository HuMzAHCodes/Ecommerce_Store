// import { useAuth as useClerkAuth } from "@clerk/clerk-react";
// import { useLocation } from "react-router-dom";

// interface ProtectedRouteAuthState {
//   isHydrating:      boolean;
//   isUnauthenticated: boolean;
//   intendedPath:     string;
// }

// const useProtectedRoute = (): ProtectedRouteAuthState => {
//   const { isSignedIn, isLoaded } = useClerkAuth();
//   const location                 = useLocation();

//   const isHydrating       = !isLoaded;
//   const isUnauthenticated = isLoaded && !isSignedIn;
//   const intendedPath      = location.pathname;

//   return { isHydrating, isUnauthenticated, intendedPath };
// };

// export default useProtectedRoute;



import { useLocation } from "react-router-dom";
import { useAuth }     from "../../components/auth/AuthContext";  // adjust path as needed

interface ProtectedRouteAuthState {
  isHydrating:       boolean;
  isUnauthenticated: boolean;
  intendedPath:      string;
}

const useProtectedRoute = (): ProtectedRouteAuthState => {
  const { isLoaded, isSignedIn } = useAuth();
  const location                 = useLocation();

  const isHydrating       = !isLoaded;
  const isUnauthenticated = isLoaded && !isSignedIn;
  const intendedPath      = location.pathname;

  return { isHydrating, isUnauthenticated, intendedPath };
};

export default useProtectedRoute;
