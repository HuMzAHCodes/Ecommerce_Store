import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";

// ── Types ─────────────────────────────────────────────────────

export interface User {
  id:     string;
  name:   string;
  email:  string;
  avatar?: string;
  role:   "CUSTOMER" | "ADMIN";
}

interface AuthState {
  user:        User | null;
  token:       string | null;
  isLoading:   boolean;
  isLoggedIn:  boolean;
}

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: { user: User; token: string } }
  | { type: "LOGIN_FAIL" }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: Partial<User> }
  | { type: "HYDRATE"; payload: { user: User; token: string } };

interface AuthContextValue extends AuthState {
  login:      (email: string, password: string) => Promise<void>;
  register:   (name: string, email: string, password: string) => Promise<void>;
  logout:     () => void;
  updateUser: (data: Partial<User>) => void;
}

// ── Reducer ───────────────────────────────────────────────────

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading:  false,
        isLoggedIn: true,
        user:       action.payload.user,
        token:      action.payload.token,
      };

    case "LOGIN_FAIL":
      return { ...state, isLoading: false };

    case "LOGOUT":
      return { user: null, token: null, isLoading: false, isLoggedIn: false };

    case "UPDATE_USER":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };

    case "HYDRATE":
      return {
        ...state,
        isLoggedIn: true,
        user:       action.payload.user,
        token:      action.payload.token,
      };

    default:
      return state;
  }
};

// ── Context ───────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};

// ── Provider ──────────────────────────────────────────────────

const TOKEN_KEY = "blum_token";
const USER_KEY  = "blum_user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user:       null,
    token:      null,
    isLoading:  false,
    isLoggedIn: false,
  });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const user  = localStorage.getItem(USER_KEY);
      if (token && user) {
        dispatch({ type: "HYDRATE", payload: { token, user: JSON.parse(user) } });
      }
    } catch { /* ignore */ }
  }, []);

  // ── Login ─────────────────────────────────────────────────
  const login = async (email: string, password: string): Promise<void> => {
    dispatch({ type: "LOGIN_START" });
    try {
      // TODO: replace with real API call
      // const res = await axios.post("/api/auth/login", { email, password });
      // const { user, token } = res.data;

      // ── Mock response (remove when backend is ready) ──────
      await new Promise((r) => setTimeout(r, 800));
      const user: User = { id: "u1", name: "Demo User", email, role: "CUSTOMER" };
      const token = "mock_jwt_token";
      // ──────────────────────────────────────────────────────

      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      dispatch({ type: "LOGIN_SUCCESS", payload: { user, token } });
    } catch {
      dispatch({ type: "LOGIN_FAIL" });
      throw new Error("Invalid email or password");
    }
  };

  // ── Register ──────────────────────────────────────────────
  const register = async (name: string, email: string, password: string): Promise<void> => {
    dispatch({ type: "LOGIN_START" });
    try {
      // TODO: replace with real API call
      // const res = await axios.post("/api/auth/register", { name, email, password });
      // const { user, token } = res.data;

      // ── Mock response ─────────────────────────────────────
      await new Promise((r) => setTimeout(r, 800));
      const user: User = { id: "u2", name, email, role: "CUSTOMER" };
      const token = "mock_jwt_token";
      // ──────────────────────────────────────────────────────

      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      dispatch({ type: "LOGIN_SUCCESS", payload: { user, token } });
    } catch {
      dispatch({ type: "LOGIN_FAIL" });
      throw new Error("Registration failed");
    }
  };

  // ── Logout ────────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    dispatch({ type: "LOGOUT" });
  };

  // ── Update user ───────────────────────────────────────────
  const updateUser = (data: Partial<User>) => {
    dispatch({ type: "UPDATE_USER", payload: data });
    if (state.user) {
      localStorage.setItem(USER_KEY, JSON.stringify({ ...state.user, ...data }));
    }
  };

  const value: AuthContextValue = {
    ...state,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
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