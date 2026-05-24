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
