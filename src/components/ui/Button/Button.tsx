import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Loader2 }  from "lucide-react";
import { useTheme } from "../../../theme/ThemeContext";
import {
  buttonBaseStyles, buttonVariantStyles,
  buttonSizeClasses, buttonIconSize,
  type ButtonVariant, type ButtonSize,
} from "./buttonStyles";

// ── Types ─────────────────────────────────────────────────────

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   ButtonVariant;
  size?:      ButtonSize;
  loading?:   boolean;
  leftIcon?:  ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  children:   ReactNode;
}

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
    const { colors, shadows } = theme;

    const isDisabled     = disabled || loading;
    const activeIconSize = buttonIconSize[size];

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={isDisabled}
        whileHover={isDisabled ? {} : { scale: 1.02, opacity: 0.92 }}
        whileTap={isDisabled   ? {} : { scale: 0.97 }}
        transition={{ duration: 0.15 }}
        style={{
          ...buttonBaseStyles(theme, isDisabled, fullWidth),
          ...buttonVariantStyles(colors, shadows)[variant],
          ...style,
        }}
        {...(rest as HTMLMotionProps<"button">)}
        className={`${buttonSizeClasses[size]} ${rest.className ?? ""}`}
      >
        {/* Left icon or loading spinner */}
        {loading
          ? <Loader2 size={activeIconSize} className="animate-spin" />
          : leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
        }

        <span>{children}</span>

        {/* Right icon — hidden while loading */}
        {!loading && rightIcon && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;

/*
 * ── Button — What this folder does ──────────────────────────────────────────
 *
 * A fully-featured, theme-aware button built on Framer Motion.
 *
 * Variants: primary | secondary | outline | ghost | danger
 * Sizes:    sm | md | lg
 *
 * Slots:   [leftIcon | spinner]  [label]  [rightIcon]
 * The spinner replaces leftIcon while loading=true.
 * rightIcon is always hidden while loading.
 *
 * Disabled state (disabled || loading):
 *   cursor not-allowed, opacity 0.55, framer animations suppressed.
 *
 * Style priority (low → high):
 *   buttonBaseStyles → variantStyles → caller style prop → sizeClasses className
 *
 * Files in this folder:
 *   buttonStyles.ts  — variant map, base styles, size classes, icon sizes
 *   Button.tsx       — forwardRef component; assembles style layers + slots
 */