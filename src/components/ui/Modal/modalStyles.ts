import type { CSSProperties } from "react";
import type { Theme }         from "../../../theme/themes";

type Colors     = Theme["colors"];
type Typography = Theme["typography"];
type Radius     = Theme["radius"];
type Shadows    = Theme["shadows"];

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export const MODAL_MAX_WIDTHS: Record<ModalSize, string> = {
  sm:   "400px",
  md:   "560px",
  lg:   "720px",
  xl:   "960px",
  full: "95vw",
};

// ── Overlay ───────────────────────────────────────────────────

export const overlayStyles = (colors: Colors): CSSProperties => ({
  position:       "fixed",
  inset:          0,
  zIndex:         1000,
  background:     colors.bgOverlay,
  backdropFilter: "blur(4px)",
});

// ── Panel positioner (the fixed centering wrapper) ────────────

export const panelPositionerStyles: CSSProperties = {
  position:       "fixed",
  inset:          0,
  zIndex:         1001,
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
  padding:        "1rem",
  pointerEvents:  "none",
};

// ── Panel card ────────────────────────────────────────────────

export const panelCardStyles = (
  colors:   Colors,
  radius:   Radius,
  shadows:  Shadows,
  maxWidth: string,
): CSSProperties => ({
  background:     colors.bgCard,
  borderRadius:   radius?.xl,
  boxShadow:      shadows?.xl,
  width:          "100%",
  maxWidth,
  maxHeight:      "90vh",
  display:        "flex",
  flexDirection:  "column",
  pointerEvents:  "all",
  overflow:       "hidden",
});

// ── Header ────────────────────────────────────────────────────

export const headerStyles = (colors: Colors): CSSProperties => ({
  display:        "flex",
  alignItems:     "center",
  justifyContent: "space-between",
  padding:        "1.25rem 1.5rem 1rem",
  borderBottom:   `1px solid ${colors.borderLight}`,
  flexShrink:     0,
});

export const titleStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  fontFamily: typography.fontDisplay,
  fontSize:   typography["2xl"],
  fontWeight: typography.weightMedium,
  color:      colors.textPrimary,
  margin:     0,
});

export const closeButtonStyles = (
  colors: Colors,
  radius: Radius,
  transitions: Theme["transitions"],
): CSSProperties => ({
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
  width:          32,
  height:         32,
  borderRadius:   radius?.full,
  background:     colors.bgSecondary,
  color:          colors.textSecondary,
  border:         "none",
  cursor:         "pointer",
  transition:     `background ${transitions?.fast}, color ${transitions?.fast}`,
  marginLeft:     "auto",
  flexShrink:     0,
});

// ── Body ──────────────────────────────────────────────────────

export const bodyStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  padding:    "1.25rem 1.5rem",
  overflowY:  "auto",
  flex:       1,
  color:      colors.textSecondary,
  fontFamily: typography.fontBody,
});

// ── Footer ────────────────────────────────────────────────────

export const footerStyles = (colors: Colors): CSSProperties => ({
  padding:        "1rem 1.5rem",
  borderTop:      `1px solid ${colors.borderLight}`,
  display:        "flex",
  gap:            "0.75rem",
  justifyContent: "flex-end",
  flexShrink:     0,
  background:     colors.bgSecondary,
});