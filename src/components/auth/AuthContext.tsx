import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  type User,
} from "firebase/auth";
import { auth } from "./firebase";
import api from "../../lib/api";

// ── Types ────────────────────────────────────────────────────

export interface DbUser {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  role: "CUSTOMER" | "ADMIN";
  createdAt: string;
}

interface AuthContextValue {
  user: User | null;
  dbUser: DbUser | null; // MySQL user record (available after sync)
  isLoaded: boolean;
  isSignedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loginGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

// ── Context ──────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ── Sync helper ──────────────────────────────────────────────

async function syncWithBackend(firebaseUser: User): Promise<DbUser | null> {
  try {
    const token = await firebaseUser.getIdToken();
    const res = await api.post(
      "/api/auth/sync",
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return res.data.data as DbUser;
  } catch (err) {
    console.error("[AuthContext] Backend sync failed:", err);
    return null;
  }
}

// ── Provider ─────────────────────────────────────────────────

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        const synced = await syncWithBackend(firebaseUser);
        setDbUser(synced);
      } else {
        setDbUser(null);
      }

      setIsLoaded(true);
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
    setDbUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        dbUser,
        isLoaded,
        isSignedIn: !!user,
        login,
        register,
        loginGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ── Hook ─────────────────────────────────────────────────────

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
