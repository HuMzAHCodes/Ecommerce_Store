import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useTheme } from "../../theme/ThemeContext";

// ── Types ─────────────────────────────────────────────────────

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type ButtonSize    = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   ButtonVariant;
  size?:      ButtonSize;
  loading?:   boolean;
  leftIcon?:  ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  children:   ReactNode;
}

// ── Style Maps ────────────────────────────────────────────────

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-7 py-3.5 text-base gap-2.5",
};

// ── Component ─────────────────────────────────────────────────

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant   = "primary",
      size      = "md",
      loading   = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      style,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme();
    const { colors, radius, transitions, shadows } = theme;

    const isDisabled = disabled || loading;

    // ── Variant styles (inline — reads from theme) ────────────
    const variantStyle = (): React.CSSProperties => {
      switch (variant) {
        case "primary":
          return {
            background:   colors.accentPrimary,
            color:        colors.textOnAccent,
            border:       "1px solid transparent",
            boxShadow:    shadows?.sm,
          };
        case "secondary":
          return {
            background:   colors.accentSecondary,
            color:        colors.textOnAccent,
            border:       "1px solid transparent",
            boxShadow:    shadows?.sm,
          };
        case "outline":
          return {
            background:   "transparent",
            color:        colors.accentPrimary,
            border:       `1px solid ${colors.accentPrimary}`,
          };
        case "ghost":
          return {
            background:   "transparent",
            color:        colors.textPrimary,
            border:       "1px solid transparent",
          };
        case "danger":
          return {
            background:   colors.error,
            color:        "#ffffff",
            border:       "1px solid transparent",
            boxShadow:    shadows?.sm,
          };
      }
    };

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={isDisabled}
        whileHover={isDisabled ? {} : { scale: 1.02, opacity: 0.92 }}
        whileTap={isDisabled  ? {} : { scale: 0.97 }}
        transition={{ duration: 0.15 }}
        style={{
          // Base
          display:        "inline-flex",
          alignItems:     "center",
          justifyContent: "center",
          fontFamily:     theme.typography.fontBody,
          fontWeight:     theme.typography.weightMedium,
          borderRadius:   radius?.full,
          cursor:         isDisabled ? "not-allowed" : "pointer",
          opacity:        isDisabled ? 0.55 : 1,
          width:          fullWidth ? "100%" : "auto",
          whiteSpace:     "nowrap",
          transition:     `background ${transitions?.fast}, color ${transitions?.fast}, border-color ${transitions?.fast}`,
          outline:        "none",
          userSelect:     "none",
          // Variant
          ...variantStyle(),
          // Caller overrides
          ...style,
        }}
        {...(rest as HTMLMotionProps<"button">)}
        className={`${sizeStyles[size]} ${rest.className ?? ""}`}
      >
        {/* Left icon or spinner */}
        {loading ? (
          <Loader2 size={size === "sm" ? 14 : size === "lg" ? 18 : 16} className="animate-spin" />
        ) : (
          leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
        )}

        <span>{children}</span>

        {/* Right icon */}
        {!loading && rightIcon && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;

// ── File Overview ──────────────────────────────────────────────────────────────
//
// Button.tsx
// A fully-featured, theme-aware button component built on Framer Motion.
// Supports multiple visual variants, three sizes, icon slots, a loading state,
// and full-width layout — all styled from ThemeContext with no external CSS.
//
// ── What it renders ───────────────────────────────────────────────────────────
//
// A <motion.button> pill that animates subtly on hover and tap.
// Layout is inline-flex with three optional slots: [leftIcon] [label] [rightIcon].
// All colors, typography, radius, shadows, and transitions come from the theme.
//
// ── Props ─────────────────────────────────────────────────────────────────────
//
//  variant    — controls the color scheme (default: "primary"):
//                 primary   | secondary | outline | ghost | danger
//  size       — controls padding, font size, and icon size (default: "md"):
//                 sm | md | lg
//  loading    — shows a spinning Loader2 icon in place of leftIcon and locks
//               the button into a disabled state until the operation resolves
//  leftIcon   — optional node rendered before the label (hidden while loading)
//  rightIcon  — optional node rendered after  the label (always hidden while loading)
//  fullWidth  — stretches the button to 100% of its container width
//  disabled   — standard HTML disabled; merged with `loading` into `isDisabled`
//  style      — caller inline-style overrides applied last (highest specificity)
//  ...rest    — all native <button> HTML attributes are forwarded to the element
//
// ── Disabled / loading state ─────────────────────────────────────────────────
//
//  isDisabled = disabled || loading
//  When true:
//    • cursor becomes "not-allowed"
//    • opacity drops to 0.55
//    • Framer Motion hover/tap animations are suppressed (empty objects passed)
//    • the native `disabled` attribute is set, blocking all click events
//
// ── Variant → style mapping ───────────────────────────────────────────────────
//
//  primary   — accentPrimary bg,   textOnAccent fg,  subtle shadow
//  secondary — accentSecondary bg, textOnAccent fg,  subtle shadow
//  outline   — transparent bg,     accentPrimary fg, accentPrimary border
//  ghost     — transparent bg,     textPrimary fg,   transparent border
//  danger    — error color bg,     white fg,         subtle shadow
//
//  variantStyle() is a switch function (not a static map) so it can be
//  extended with dynamic theme logic per variant in the future.
//
// ── Size tokens ───────────────────────────────────────────────────────────────
//
//  Spacing and font size are applied via Tailwind utility classes (sizeStyles map).
//  Icon size is derived separately inside the JSX:
//    sm → 14 px  |  md → 16 px  |  lg → 18 px
//
// ── Animation (Framer Motion) ─────────────────────────────────────────────────
//
//  whileHover — scale: 1.02, opacity: 0.92  (gives a gentle "lift" feel)
//  whileTap   — scale: 0.97                 (gives tactile "press" feedback)
//  transition — 150 ms, applied to both     (fast enough to feel snappy)
//  Both are set to empty objects when isDisabled to prevent any animation.
//
// ── Style priority (low → high) ──────────────────────────────────────────────
//
//  Base inline styles
//    ↓
//  variantStyle() (spread on top)
//    ↓
//  caller `style` prop (spread last — wins everything)
//    ↓
//  sizeStyles Tailwind classes + rest.className (for spacing / font size)
//
// ── forwardRef ────────────────────────────────────────────────────────────────
//
//  The component is wrapped in forwardRef so parent components and form
//  libraries can attach a ref directly to the underlying <button> DOM node
//  (e.g. for focus management, imperative clicks, or integration with
//  React Hook Form's register()).
//
// ── Dependencies ─────────────────────────────────────────────────────────────
//
//  framer-motion — motion.button for declarative micro-animations
//  lucide-react  — Loader2 icon for the loading spinner (animate-spin via Tailwind)
//  useTheme()    — pulls colors, typography, radius, shadows, transitions
//                  from ThemeContext; no CSS classes needed for theming