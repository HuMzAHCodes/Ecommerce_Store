import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useAuth as useFirebaseAuth } from "../components/auth/AuthContext"; // adjust path if needed

// ── Types ─────────────────────────────────────────────────────

export interface AuthUser {
  id:      string;
  name:    string;
  email:   string;
  avatar?: string;
  role:    "CUSTOMER" | "ADMIN";
}

interface AuthContextValue {
  user:       AuthUser | null;
  isLoggedIn: boolean;
  isLoading:  boolean;
  getToken:   () => Promise<string | null>;
}

// ── Context ───────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
};

// ── Provider ──────────────────────────────────────────────────

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user: firebaseUser, isLoaded, isSignedIn } = useFirebaseAuth();

  // Map Firebase user → our internal AuthUser shape
  const mappedUser = useMemo((): AuthUser | null => {
    if (!firebaseUser) return null;
    return {
      id:     firebaseUser.uid,
      name:   firebaseUser.displayName ?? firebaseUser.email ?? "User",
      email:  firebaseUser.email ?? "",
      avatar: firebaseUser.photoURL ?? undefined,
      role:   "CUSTOMER",
    };
  }, [firebaseUser]);

  // Firebase doesn't use session tokens the same way —
  // returns the Firebase ID token for authenticated API calls
  const getToken = async (): Promise<string | null> => {
    try {
      return firebaseUser ? await firebaseUser.getIdToken() : null;
    } catch {
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user:       mappedUser,
        isLoggedIn: isSignedIn,
        isLoading:  !isLoaded,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;








// ──────────────────────────────────────────────────────────────────────────────
// FILE OVERVIEW: AuthContext.tsx
// ──────────────────────────────────────────────────────────────────────────────
//
// PURPOSE
// -------
// This file implements a global authentication system for the "Blum" app using
// React Context + useReducer. It covers the full auth lifecycle: login,
// registration, logout, session persistence (via localStorage), and user
// profile updates. Any component in the tree can read auth state or trigger
// auth actions without prop-drilling, by calling the `useAuth()` hook.
//
//
// KEY BUILDING BLOCKS
// -------------------
//
// 1. Types
//    - `User`          — shape of the authenticated user object
//                        (id, name, email, optional avatar, role).
//    - `AuthState`     — the four pieces of state the reducer manages:
//                        user, token, isLoading, and isLoggedIn.
//    - `AuthAction`    — the six actions the reducer understands
//                        (LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT,
//                         UPDATE_USER, HYDRATE).
//    - `AuthContextValue` — everything the context exposes to consumers:
//                           the state fields plus the four action functions.
//
// 2. authReducer
//    A pure function: (state, action) → new state. It handles every possible
//    state transition in one place, making the logic predictable and testable.
//    Notable transitions:
//    - LOGIN_START  → sets isLoading = true (show a spinner).
//    - LOGIN_SUCCESS→ stores user + token, marks isLoggedIn = true.
//    - LOGIN_FAIL   → clears isLoading without changing anything else.
//    - LOGOUT       → resets the entire state to "signed out".
//    - UPDATE_USER  → shallow-merges a partial User into the existing user.
//    - HYDRATE      → same as LOGIN_SUCCESS but fired on app boot, not on form
//                     submit (no loading flash needed).
//
// 3. AuthContext / useAuth()
//    - `AuthContext` is the React context object created with `createContext`.
//    - `useAuth()` is the public hook. It throws if called outside
//      <AuthProvider>, preventing silent "null context" bugs.
//
// 4. AuthProvider
//    The component that owns the state and wires everything together:
//
//    a) Initialisation
//       `useReducer` starts with user=null, token=null, isLoading=false,
//       isLoggedIn=false.
//
//    b) Hydration (useEffect, runs once on mount)
//       Reads `blum_token` and `blum_user` from localStorage. If both are
//       present it dispatches HYDRATE so the user stays logged in across
//       page refreshes without hitting the network.
//
//    c) login(email, password)
//       Dispatches LOGIN_START → awaits the API (currently mocked with a
//       timeout) → on success: writes token + user to localStorage and
//       dispatches LOGIN_SUCCESS. On failure: dispatches LOGIN_FAIL and
//       re-throws so the calling component can display an error message.
//
//    d) register(name, email, password)
//       Identical flow to login but calls the registration endpoint.
//       After registration the user is immediately logged in (no extra step).
//
//    e) logout()
//       Removes both localStorage keys and dispatches LOGOUT, which zeroes
//       out the entire auth state synchronously.
//
//    f) updateUser(partialUser)
//       Dispatches UPDATE_USER to patch state, then syncs the updated object
//       back to localStorage so the change survives a refresh.
//
//    g) Context value
//       Spreads the full state plus the four functions into `value` and passes
//       it to <AuthContext.Provider>, making everything available to any
//       descendant that calls useAuth().
//
//
// STORAGE KEYS
// ------------
// blum_token  — the JWT (or mock token) used to authenticate API requests.
// blum_user   — the serialised User object cached for instant hydration.
//
//
// REPLACING THE MOCK API
// ----------------------
// Both `login` and `register` contain TODO comments marking where the
// simulated timeout + hardcoded user should be swapped for real axios/fetch
// calls. The surrounding dispatch logic stays the same; only the inner
// mock block changes.
//
// ──────────────────────────────────────────────────────────────────────────────