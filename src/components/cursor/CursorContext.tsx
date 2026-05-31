import { createContext, useContext, useState, type ReactNode } from "react";

// ── Mode registry ─────────────────────────────────────────────
// Add new cursor modes here as you expand — the rest of the
// system picks them up automatically.
export type CursorMode =
  | "default"   // soft glow circle — always active
  | "hover"     // slightly larger glow, for generic hoverable elements
  | "view"      // large VIEW text — product cards
  | "drag"      // ↔ drag hint — horizontal scroll sections
  | "bloom"     // 🌸 — category cards
  | "pill"      // expanding pill — CTA buttons
  | "link";     // slim underline — navbar links

// ── Context shape ─────────────────────────────────────────────
interface CursorContextValue {
  mode:    CursorMode;
  setMode: (mode: CursorMode) => void;
}

export const CursorContext = createContext<CursorContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────
export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<CursorMode>("default");

  return (
    <CursorContext.Provider value={{ mode, setMode }}>
      {children}
    </CursorContext.Provider>
  );
};

// ── Raw context hook (internal use) ───────────────────────────
export const useCursorContext = (): CursorContextValue => {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useCursorContext must be inside <CursorProvider>");
  return ctx;
};
