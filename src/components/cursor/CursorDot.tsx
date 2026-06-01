import { useEffect, useRef, useState } from "react";
import type React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursorContext, type CursorMode } from "./CursorContext";

// ── Mode config ───────────────────────────────────────────────
// To add a new cursor mode: add an entry here. Nothing else changes.
interface ModeStyle {
  dotSize:      number;   // inner dot diameter px
  ringSize:     number;   // outer glow ring diameter px
  ringOpacity:  number;   // glow ring opacity
  ringBlur:     number;   // glow blur radius px
  label?:       string;   // optional text label (e.g. "VIEW", "↔", "🌸")
  labelSize:    number;   // label font size px
  ringColor:    string;   // glow ring color
  dotColor:     string;   // inner dot color
  dotScale:     number;   // inner dot scale multiplier on this mode
  ringScale:    number;   // ring scale multiplier on this mode
  mixBlendMode?: string;  // CSS mix-blend-mode — "difference" for blob inversion effect
}

const MODE_STYLES: Record<CursorMode, ModeStyle> = {
  default: {
    dotSize: 8,   ringSize: 36,
    dotColor:  "rgba(181, 114, 74, 0.9)",   // accentPrimary terracotta
    ringColor: "rgba(181, 114, 74, 0.25)",
    ringOpacity: 1, ringBlur: 8,
    label: undefined, labelSize: 0,
    dotScale: 1, ringScale: 1,
  },
  hover: {
    dotSize: 8,   ringSize: 52,
    dotColor:  "rgba(181, 114, 74, 0.9)",
    ringColor: "rgba(181, 114, 74, 0.35)",
    ringOpacity: 1, ringBlur: 12,
    label: undefined, labelSize: 0,
    dotScale: 1.2, ringScale: 1.4,
  },
  view: {
    dotSize: 0,   ringSize: 72,
    dotColor:  "transparent",
    ringColor: "rgba(181, 114, 74, 0.85)",
    ringOpacity: 1, ringBlur: 0,
    label: "VIEW", labelSize: 11,
    dotScale: 0, ringScale: 1,
  },
  drag: {
    dotSize: 0,   ringSize: 64,
    dotColor:  "transparent",
    ringColor: "rgba(181, 114, 74, 0.85)",
    ringOpacity: 1, ringBlur: 0,
    label: "↔", labelSize: 18,
    dotScale: 0, ringScale: 1,
  },
  bloom: {
    dotSize: 0,   ringSize: 68,
    dotColor:  "transparent",
    ringColor: "rgba(181, 114, 74, 0.85)",
    ringOpacity: 1, ringBlur: 0,
    label: "🌸", labelSize: 22,
    dotScale: 0, ringScale: 1,
  },
  pill: {
    dotSize: 0,   ringSize: 56,
    dotColor:  "transparent",
    ringColor: "rgba(181, 114, 74, 0.9)",
    ringOpacity: 1, ringBlur: 4,
    label: undefined, labelSize: 0,
    dotScale: 0, ringScale: 1,
  },
  link: {
    dotSize: 4,   ringSize: 28,
    dotColor:  "rgba(181, 114, 74, 1)",
    ringColor: "rgba(181, 114, 74, 0.2)",
    ringOpacity: 1, ringBlur: 4,
    label: undefined, labelSize: 0,
    dotScale: 1, ringScale: 0.8,
  },

  // ── Blob ──────────────────────────────────────────────────────
  // Large white circle with mix-blend-mode: difference.
  // The "difference" blend inverts whatever colour is underneath the cursor —
  // dark text becomes light, light bg becomes dark. Zero extra logic needed,
  // pure CSS does the inversion automatically.
  // Best on: large display headings with high contrast text.
  blob: {
    dotSize:      0,
    ringSize:     110,
    dotColor:     "transparent",
    // White is required for mix-blend-mode:difference to produce true inversion.
    // Any other colour produces a tinted inversion instead.
    ringColor:    "rgba(181, 114, 74, 0.35)",
    ringOpacity:  1,
    ringBlur:     0,
    label:        undefined,
    labelSize:    0,
    dotScale:     0,
    ringScale:    1,
    mixBlendMode: "normal",
  },
};

// ── Spring config ─────────────────────────────────────────────
// Inner dot follows tightly. Outer ring lags behind — creates
// the "magnetic" feel where the ring catches up to the dot.
const DOT_SPRING  = { damping: 28, stiffness: 550, mass: 0.5 };
const RING_SPRING = { damping: 22, stiffness: 180, mass: 0.8 };

// ── Component ─────────────────────────────────────────────────

/**
 * CursorDot
 *
 * Renders two absolutely-positioned layers:
 *   1. A small inner dot  — tight spring, follows mouse closely
 *   2. A larger glow ring — loose spring, lags behind (magnetic feel)
 *
 * Hides the native OS cursor on the entire document via CSS.
 * Automatically disappears when the mouse leaves the window.
 *
 * Mount once inside <CursorProvider> at the app root.
 * Do NOT mount on touch/mobile devices (check via useIsMobile first).
 */
const CursorDot = () => {
  const { mode } = useCursorContext();
  const style     = MODE_STYLES[mode];

  // Raw mouse position (unsprung)
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Sprung positions — dot is tight, ring lags
  const dotX  = useSpring(rawX, DOT_SPRING);
  const dotY  = useSpring(rawY, DOT_SPRING);
  const ringX = useSpring(rawX, RING_SPRING);
  const ringY = useSpring(rawY, RING_SPRING);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hide native cursor globally
    document.documentElement.style.cursor = "none";

    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const hide = () => setVisible(false);
    const show = () => setVisible(true);

    window.addEventListener("mousemove",  move);
    window.addEventListener("mouseleave", hide);
    window.addEventListener("mouseenter", show);

    return () => {
      // Restore native cursor on unmount
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove",  move);
      window.removeEventListener("mouseleave", hide);
      window.removeEventListener("mouseenter", show);
    };
  }, [visible, rawX, rawY]);

  if (!visible) return null;

  return (
    <>
      {/* ── Outer glow ring ────────────────────────────────── */}
      <motion.div
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          pointerEvents: "none",  // never blocks clicks
          zIndex:        99999,
          x:             ringX,
          y:             ringY,
          translateX:    "-50%",
          translateY:    "-50%",
          // ADDED: mixBlendMode from mode config — "difference" for blob,
          // undefined (normal) for all other modes. This is the inversion trick.
          mixBlendMode:  (style.mixBlendMode as React.CSSProperties["mixBlendMode"]) ?? "normal",
        }}
        animate={{
          width:        style.ringSize,
          height:       style.ringSize,
          background:   style.ringColor,
          opacity:      style.ringOpacity,
          filter:       `blur(${style.ringBlur}px)`,
          borderRadius: "50%",
          scale:        style.ringScale,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Label (VIEW, ↔, 🌸 etc) sits inside the ring */}
        {style.label && (
          <div style={{
            position:       "absolute",
            inset:          0,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            fontSize:       style.labelSize,
            fontFamily:     "'DM Sans', sans-serif",
            fontWeight:     600,
            color:          "#fff",
            letterSpacing:  "0.08em",
            userSelect:     "none",
            // Emoji needs no extra styling; text labels get uppercase
            textTransform:  style.label.match(/[a-zA-Z]/) ? "uppercase" : "none",
            lineHeight:     1,
          }}>
            {style.label}
          </div>
        )}
      </motion.div>

      {/* ── Inner dot ──────────────────────────────────────── */}
      <motion.div
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          pointerEvents: "none",
          zIndex:        100000, // always on top of ring
          x:             dotX,
          y:             dotY,
          translateX:    "-50%",
          translateY:    "-50%",
          borderRadius:  "50%",
        }}
        animate={{
          width:      style.dotSize,
          height:     style.dotSize,
          background: style.dotColor,
          scale:      style.dotScale,
          opacity:    style.dotSize > 0 ? 1 : 0,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
    </>
  );
};

export default CursorDot;
