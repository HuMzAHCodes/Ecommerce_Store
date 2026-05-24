import type { ReactNode } from "react";
import { useTheme } from "../../theme/ThemeContext";

// ── Types ─────────────────────────────────────────────────────

type BadgeVariant = "sale" | "new" | "soldOut" | "featured" | "info" | "success" | "warning" | "error";
type BadgeSize    = "sm" | "md";

interface BadgeProps {
  variant?:  BadgeVariant;
  size?:     BadgeSize;
  children?: ReactNode;
  // convenience props — auto-set label if children not given
  sale?:     boolean;
  new?:      boolean;
  soldOut?:  boolean;
}

// ── Component ─────────────────────────────────────────────────

const Badge = ({ variant = "info", size = "md", sale, new: isNew, soldOut, children }: BadgeProps) => {
  const theme = useTheme();
  const { colors } = theme;

  // Convenience props shortcut
  const resolvedVariant: BadgeVariant =
    sale    ? "sale"    :
    isNew   ? "new"     :
    soldOut ? "soldOut" : variant;

  const resolvedLabel =
    children ??
    (sale    ? "Sale"      :
     isNew   ? "New"       :
     soldOut ? "Sold Out"  : "");

  // ── Style map ──────────────────────────────────────────────
  const styles: Record<BadgeVariant, React.CSSProperties> = {
    sale:     { background: colors.accentPrimary,   color: colors.textOnAccent },
    new:      { background: colors.accentSecondary, color: colors.textOnAccent },
    soldOut:  { background: colors.textMuted,       color: "#fff" },
    featured: { background: colors.textPrimary,     color: colors.textOnDark },
    info:     { background: colors.accentLight,     color: colors.accentPrimary },
    success:  { background: colors.successBg,       color: colors.success },
    warning:  { background: colors.warningBg,       color: colors.warning },
    error:    { background: colors.errorBg,         color: colors.error },
  };

  const sizeStyle: React.CSSProperties = size === "sm"
    ? { fontSize: "0.65rem", padding: "2px 7px" }
    : { fontSize: "0.72rem", padding: "3px 10px" };

  return (
    <span
      style={{
        display:      "inline-flex",
        alignItems:   "center",
        borderRadius: theme.radius?.full,
        fontFamily:   theme.typography.fontBody,
        fontWeight:   theme.typography.weightMedium,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        whiteSpace:   "nowrap",
        lineHeight:   1,
        ...styles[resolvedVariant],
        ...sizeStyle,
      }}
    >
      {resolvedLabel}
    </span>
  );
};

export default Badge;

// ── File Overview ──────────────────────────────────────────────────────────────
//
// Badge.tsx
// A small, theme-aware label pill used to surface status or category
// information at a glance (e.g. "Sale", "New", "Sold Out").
//
// ── What it renders ───────────────────────────────────────────────────────────
//
// A single <span> styled as a rounded pill with uppercased text.
// All colors, font, and border-radius come from the global ThemeContext so
// the badge automatically adapts to light/dark or brand themes.
//
// ── Props & the two ways to use it ───────────────────────────────────────────
//
//  1. Explicit variant + children  →  full control
//       <Badge variant="success">In Stock</Badge>
//
//  2. Convenience boolean props  →  zero-config shortcuts for the three most
//     common e-commerce states. Setting `sale`, `new`, or `soldOut` to true
//     both selects the matching variant AND supplies a default label, so you
//     don't have to pass children at all:
//       <Badge sale />          // renders "Sale"   in accentPrimary colors
//       <Badge new />           // renders "New"    in accentSecondary colors
//       <Badge soldOut />       // renders "Sold Out" in muted colors
//
//     Convenience props take priority over `variant` in the resolution chain:
//       sale → "sale"  >  new → "new"  >  soldOut → "soldOut"  >  variant prop
//
// ── Variant → color mapping ───────────────────────────────────────────────────
//
//  sale     — accentPrimary bg,   textOnAccent fg  (e.g. brand red)
//  new      — accentSecondary bg, textOnAccent fg  (e.g. brand blue/green)
//  soldOut  — textMuted bg,       white fg         (de-emphasised)
//  featured — textPrimary bg,     textOnDark fg    (inverted / dark pill)
//  info     — accentLight bg,     accentPrimary fg (soft tint)
//  success  — successBg,          success fg       (green tones)
//  warning  — warningBg,          warning fg       (amber tones)
//  error    — errorBg,            error fg         (red tones)
//
// ── Size tokens ───────────────────────────────────────────────────────────────
//
//  md (default) — 0.72 rem font, 3 px / 10 px padding  (standard UI use)
//  sm           — 0.65 rem font, 2 px /  7 px padding  (tight spaces, tables)
//
// ── Label resolution order ────────────────────────────────────────────────────
//
//  children  (highest priority — overrides everything)
//    ↓
//  convenience-prop default string ("Sale" / "New" / "Sold Out")
//    ↓
//  empty string  (renders an empty pill; useful for icon-only badges)
//
// ── Dependencies ─────────────────────────────────────────────────────────────
//
//  useTheme()  — pulls colors, typography, and radius from ThemeContext.
//               No external CSS classes; all styles are inline and fully
//               driven by the theme token, making the component portable
//               and SSR-safe without a CSS-in-JS runtime.