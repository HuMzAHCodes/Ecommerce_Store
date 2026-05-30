import type { CSSProperties } from "react";
import type { Theme }         from "../../../theme/themes";

type Colors     = Theme["colors"];
type Typography = Theme["typography"];
type Radius     = Theme["radius"];

export const inputWrapperStyles = (fullWidth: boolean): CSSProperties => ({
  display:       "flex",
  flexDirection: "column",
  gap:           "5px",
  width:         fullWidth ? "100%" : "auto",
});

export const labelStyles = (
  typography: Typography,
  colors:     Colors,
  hasError:   boolean,
): CSSProperties => ({
  fontSize:   typography.sm,
  fontWeight: typography.weightMedium,
  color:      hasError ? colors.error : colors.textPrimary,
  fontFamily: typography.fontBody,
});

export const requiredAsteriskStyles = (colors: Colors): CSSProperties => ({
  color:       colors.accentPrimary,
  marginLeft:  3,
});

export const inputRowStyles: CSSProperties = {
  position:   "relative",
  display:    "flex",
  alignItems: "center",
};

export const leftIconStyles = (
  colors:      Colors,
  transitions: Theme["transitions"],
  isFocused:   boolean,
): CSSProperties => ({
  position:      "absolute",
  left:          12,
  color:         isFocused ? colors.accentPrimary : colors.textMuted,
  display:       "flex",
  alignItems:    "center",
  transition:    `color ${transitions?.fast}`,
  pointerEvents: "none",
});

export const rightIconStyles = (colors: Colors): CSSProperties => ({
  position:   "absolute",
  right:      12,
  color:      colors.textMuted,
  display:    "flex",
  alignItems: "center",
});

export const inputFieldStyles = (
  typography:   Typography,
  colors:       Colors,
  radius:       Radius,
  transitions:  Theme["transitions"],
  borderColor:  string,
  boxShadow:    string,
  hasLeftIcon:  boolean,
  hasRightIcon: boolean,
): CSSProperties => ({
  width:        "100%",
  fontFamily:   typography.fontBody,
  fontSize:     typography.base,
  color:        colors.textPrimary,
  background:   colors.bgCard,
  border:       `1px solid ${borderColor}`,
  borderRadius: radius?.md,
  padding:      `0.6rem ${hasRightIcon ? "2.75rem" : "0.875rem"} 0.6rem ${hasLeftIcon ? "2.75rem" : "0.875rem"}`,
  outline:      "none",
  transition:   `border-color ${transitions?.fast}, box-shadow ${transitions?.fast}`,
  boxShadow,
});

export const helperTextStyles = (
  typography: Typography,
  color:      string,
): CSSProperties => ({
  fontSize:   typography.xs,
  color,
  fontFamily: typography.fontBody,
});