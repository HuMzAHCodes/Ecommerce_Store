import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../../theme/ThemeContext";
import type { Toast, ToastType, ToastVisualConfig } from "./types";

// ── Animation variants ────────────────────────────────────────

const toastAnimationVariants = {
  initial:  { opacity: 0, y: 40,  scale: 0.94 },
  animate:  { opacity: 1, y: 0,   scale: 1    },
  exit:     { opacity: 0, y: 20,  scale: 0.94 },
};

const toastTransition = {
  duration: 0.25,
  ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
};

// ── Type → visual config ──────────────────────────────────────

/**
 * Maps each toast type to its background, foreground color, and icon.
 * Pulled here so ToastItem stays clean — just destructures the result.
 */
const buildVisualConfig = (
  type: ToastType,
  colors: ReturnType<typeof useTheme>["colors"]
): ToastVisualConfig => {
  const configMap: Record<ToastType, ToastVisualConfig> = {
    success: { bg: colors.successBg,   color: colors.success,        icon: <CheckCircle size={18} /> },
    error:   { bg: colors.errorBg,     color: colors.error,          icon: <XCircle size={18} />     },
    warning: { bg: colors.warningBg,   color: colors.warning,        icon: <AlertCircle size={18} /> },
    info:    { bg: colors.accentLight, color: colors.accentPrimary,  icon: <Info size={18} />        },
  };

  return configMap[type];
};

// ── Component ─────────────────────────────────────────────────

interface ToastItemProps {
  toast:    Toast;
  onRemove: (id: string) => void;
}

/**
 * Renders a single toast pill — purely presentational.
 * Layout: [icon] [message] [X button] in a horizontal flex row.
 * Border uses the foreground color at 13% opacity (${color}22) for a subtle tint.
 */
const ToastItem = ({ toast, onRemove }: ToastItemProps) => {
  const { colors, radius, shadows, typography } = useTheme();
  const { bg, color, icon } = buildVisualConfig(toast.type, colors);

  return (
    <motion.div
      layout
      variants={toastAnimationVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={toastTransition}
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
      {/* Icon — flex-shrink so it never compresses */}
      <span style={{ flexShrink: 0, marginTop: 1 }}>{icon}</span>

      {/* Message — flex: 1 so it fills available space and wraps naturally */}
      <span style={{ flex: 1, fontSize: typography.sm, fontWeight: typography.weightMedium, lineHeight: 1.5 }}>
        {toast.message}
      </span>

      {/* Close button — de-emphasised at 0.6 opacity */}
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

export default ToastItem;
