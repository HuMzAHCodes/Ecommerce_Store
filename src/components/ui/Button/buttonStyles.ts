import type { CSSProperties } from "react";
import type { Theme }         from "../../../theme/themes";

type Colors  = Theme["colors"];
type Shadows = Theme["shadows"];

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";
export type ButtonSize    = "sm" | "md" | "lg";

export const buttonVariantStyles = (
  colors:  Colors,
  shadows: Shadows,
): Record<ButtonVariant, CSSProperties> => ({
  primary: {
    background: colors.accentPrimary,
    color:      colors.textOnAccent,
    border:     "1px solid transparent",
    boxShadow:  shadows?.sm,
  },
  secondary: {
    background: colors.accentSecondary,
    color:      colors.textOnAccent,
    border:     "1px solid transparent",
    boxShadow:  shadows?.sm,
  },
  outline: {
    background: "transparent",
    color:      colors.accentPrimary,
    border:     `1px solid ${colors.accentPrimary}`,
  },
  ghost: {
    background: "transparent",
    color:      colors.textPrimary,
    border:     "1px solid transparent",
  },
  danger: {
    background: colors.error,
    color:      "#ffffff",
    border:     "1px solid transparent",
    boxShadow:  shadows?.sm,
  },
});

export const buttonBaseStyles = (
  theme:      Theme,
  isDisabled: boolean,
  fullWidth:  boolean,
): CSSProperties => ({
  display:        "inline-flex",
  alignItems:     "center",
  justifyContent: "center",
  fontFamily:     theme.typography.fontBody,
  fontWeight:     theme.typography.weightMedium,
  borderRadius:   theme.radius?.full,
  cursor:         isDisabled ? "not-allowed" : "pointer",
  opacity:        isDisabled ? 0.55 : 1,
  width:          fullWidth ? "100%" : "auto",
  whiteSpace:     "nowrap",
  transition:     `background ${theme.transitions?.fast}, color ${theme.transitions?.fast}, border-color ${theme.transitions?.fast}`,
  outline:        "none",
  userSelect:     "none",
});

// Tailwind spacing + font-size classes — applied via className
export const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-7 py-3.5 text-base gap-2.5",
};

export const buttonIconSize: Record<ButtonSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
};