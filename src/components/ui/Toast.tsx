import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";
import { useTheme } from "../../theme/ThemeContext";

// ── Types ─────────────────────────────────────────────────────

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id:       string;
  type:     ToastType;
  message:  string;
  duration?: number;
}

interface ToastContextValue {
  success: (message: string, duration?: number) => void;
  error:   (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info:    (message: string, duration?: number) => void;
}

// ── Context ───────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
};

// ── Single Toast Item ─────────────────────────────────────────

const ToastItem = ({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) => {
  const theme = useTheme();
  const { colors, radius, shadows, typography } = theme;

  const config: Record<ToastType, { bg: string; color: string; icon: ReactNode }> = {
    success: { bg: colors.successBg, color: colors.success,  icon: <CheckCircle size={18} /> },
    error:   { bg: colors.errorBg,   color: colors.error,    icon: <XCircle size={18} />     },
    warning: { bg: colors.warningBg, color: colors.warning,  icon: <AlertCircle size={18} /> },
    info:    { bg: colors.accentLight,color: colors.accentPrimary, icon: <Info size={18} />  },
  };

  const { bg, color, icon } = config[toast.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={{ opacity: 1, y: 0,  scale: 1 }}
      exit={{   opacity: 0, y: 20,  scale: 0.94 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      style={{
        display:      "flex",
        alignItems:   "flex-start",
        gap:          "0.65rem",
        background:   bg,
        color,
        borderRadius: radius?.lg,
        boxShadow:    shadows?.lg,
        padding:      "0.875rem 1rem",
        minWidth:     280,
        maxWidth:     380,
        border:       `1px solid ${color}22`,
        fontFamily:   typography.fontBody,
      }}
    >
      {/* Icon */}
      <span style={{ flexShrink: 0, marginTop: 1 }}>{icon}</span>

      {/* Message */}
      <span style={{ flex: 1, fontSize: typography.sm, fontWeight: typography.weightMedium, lineHeight: 1.5 }}>
        {toast.message}
      </span>

      {/* Close */}
      <button
        onClick={() => onRemove(toast.id)}
        style={{
          flexShrink: 0,
          background: "none",
          border:     "none",
          cursor:     "pointer",
          color,
          opacity:    0.6,
          padding:    0,
          display:    "flex",
        }}
      >
        <X size={15} />
      </button>
    </motion.div>
  );
};

// ── Provider ──────────────────────────────────────────────────

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const add = useCallback((type: ToastType, message: string, duration = 4000) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, message, duration }]);
    if (duration > 0) setTimeout(() => remove(id), duration);
  }, [remove]);

  const value: ToastContextValue = {
    success: (msg, dur) => add("success", msg, dur),
    error:   (msg, dur) => add("error",   msg, dur),
    warning: (msg, dur) => add("warning", msg, dur),
    info:    (msg, dur) => add("info",    msg, dur),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div
          style={{
            position:  "fixed",
            bottom:    "1.5rem",
            right:     "1.5rem",
            zIndex:    9999,
            display:   "flex",
            flexDirection: "column",
            gap:       "0.625rem",
            alignItems: "flex-end",
          }}
        >
          <AnimatePresence mode="popLayout">
            {toasts.map((t) => (
              <ToastItem key={t.id} toast={t} onRemove={remove} />
            ))}
          </AnimatePresence>
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;

// ── File Overview ──────────────────────────────────────────────────────────────
//
// Toast.tsx
// A self-contained toast notification system built on React Context + Portal.
// Exposes a <ToastProvider> wrapper and a useToast() hook; any component in
// the tree can fire a toast with a single function call — no prop drilling,
// no external state library required.
//
// ── Architecture: three moving parts ─────────────────────────────────────────
//
//  1. ToastContext      — React context that holds the four trigger functions
//                         (success / error / warning / info). Null by default;
//                         useToast() throws a clear error if accessed outside
//                         the provider.
//
//  2. ToastItem         — Presentational component that renders a single toast
//                         pill. Reads its own theme via useTheme(); knows
//                         nothing about the toast list or how toasts are added.
//
//  3. ToastProvider     — Stateful component that owns the toasts[] array,
//                         exposes the context value, and renders the portal.
//                         Wraps the app (or a subtree) at the root level.
//
// ── Data flow ─────────────────────────────────────────────────────────────────
//
//  Component calls useToast().success("Saved!")
//    → add("success", "Saved!", 4000) runs inside ToastProvider
//    → a new Toast object { id, type, message, duration } is appended to toasts[]
//    → setTimeout(() => remove(id), 4000) is scheduled
//    → toasts[] state update triggers a re-render
//    → the portal re-renders and AnimatePresence animates the new ToastItem in
//    → after 4 s, remove(id) filters it out and AnimatePresence animates it out
//
// ── Toast ID generation ───────────────────────────────────────────────────────
//
//  IDs are generated with Math.random().toString(36).slice(2) — a short
//  alphanumeric string. Collision probability is negligible for typical UI
//  usage. No external uuid library is needed.
//
// ── Auto-dismiss & manual dismiss ────────────────────────────────────────────
//
//  Auto:    duration defaults to 4000 ms. setTimeout fires remove(id) after
//           the delay. Passing duration = 0 skips the timer entirely, creating
//           a persistent toast that only closes on manual interaction.
//  Manual:  each ToastItem renders an X button that calls onRemove(toast.id)
//           directly, removing it from state immediately regardless of the timer.
//           (Note: the timer still fires after the original delay but remove()
//           is a no-op at that point since the id is already gone from the array.)
//
// ── ToastItem layout ──────────────────────────────────────────────────────────
//
//  A horizontal flex row (280–380 px wide) with three slots:
//    [icon]     — type-specific lucide icon, flexShrink: 0
//    [message]  — flex: 1, wraps naturally for longer text
//    [X button] — flexShrink: 0, opacity 0.6 to de-emphasise
//
// ── Type → visual config mapping ─────────────────────────────────────────────
//
//  success  — successBg / success color   + CheckCircle icon
//  error    — errorBg   / error color     + XCircle icon
//  warning  — warningBg / warning color   + AlertCircle icon
//  info     — accentLight / accentPrimary + Info icon
//
//  Border uses the same foreground color at 13% opacity (`${color}22` hex alpha)
//  for a subtle tinted outline that matches each variant without being heavy.
//
// ── Animations (Framer Motion) ────────────────────────────────────────────────
//
//  Each ToastItem uses:
//    initial  — opacity 0, y +40, scale 0.94  (slides up from below)
//    animate  — opacity 1, y 0,   scale 1
//    exit     — opacity 0, y +20, scale 0.94  (shrinks back down slightly)
//    layout   — prop enables smooth positional reflow when other toasts
//               are added or removed (the remaining pills slide smoothly)
//
//  AnimatePresence mode="popLayout" is used on the list so exiting toasts
//  are removed from the layout flow immediately, letting others reflow
//  without waiting for the exit animation to complete.
//
// ── Portal placement ──────────────────────────────────────────────────────────
//
//  The toast stack is portalled into document.body at z-index: 9999 so it
//  always floats above modals, overlays, and any other stacking contexts.
//  Position is fixed, bottom-right (1.5rem from each edge), column-flex
//  with newest toasts appending at the bottom.
//
// ── useToast() hook ───────────────────────────────────────────────────────────
//
//  Returns the ToastContextValue directly. Throws a descriptive error if
//  called outside <ToastProvider> to prevent silent failures.
//  Usage:
//    const toast = useToast();
//    toast.success("Profile saved!");
//    toast.error("Upload failed.", 6000);   // custom 6 s duration
//    toast.info("New version available.", 0); // persistent — no auto-dismiss
//
// ── Dependencies ─────────────────────────────────────────────────────────────
//
//  react-dom      — createPortal to render the stack outside the component tree
//  framer-motion  — motion.div + AnimatePresence for enter/exit/layout animations
//  lucide-react   — CheckCircle, XCircle, AlertCircle, Info, X icons
//  useTheme()     — pulls colors, radius, shadows, typography from ThemeContext