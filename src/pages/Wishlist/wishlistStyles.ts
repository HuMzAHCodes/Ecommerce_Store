import type { CSSProperties } from "react";
import type { Theme }         from "../../theme/themes";

type Colors     = Theme["colors"];
type Typography = Theme["typography"];
type Radius     = Theme["radius"];
type Shadows    = Theme["shadows"];

// ── Page shell ────────────────────────────────────────────────

export const pageStyles = (colors: Colors): CSSProperties => ({
  background: colors.bgPrimary,
  minHeight:  "100vh",
});

// ── Header band ───────────────────────────────────────────────

export const headerBandStyles = (
  colors:   Colors,
  isMobile: boolean,
): CSSProperties => ({
  background:   colors.bgSecondary,
  borderBottom: `1px solid ${colors.borderLight}`,
  padding:      isMobile ? "1.75rem 1.25rem 1.5rem" : "2.5rem 1.5rem 2rem",
});

export const headerInnerStyles: CSSProperties = {
  maxWidth: 1280,
  margin:   "0 auto",
};

export const headerTitleStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  fontFamily: typography.fontDisplay,
  color:      colors.textPrimary,
  fontStyle:  "italic",
});

export const headerCountStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  fontFamily: typography.fontBody,
  color:      colors.textMuted,
  fontSize:   typography.sm,
  marginTop:  4,
});

// ── Content area ──────────────────────────────────────────────

export const contentAreaStyles = (isMobile: boolean): CSSProperties => ({
  maxWidth: 1280,
  margin:   "0 auto",
  padding:  isMobile ? "1.25rem" : "2.5rem 1.5rem",
});

// ── Empty state ───────────────────────────────────────────────

export const emptyWrapperStyles: CSSProperties = {
  textAlign: "center",
  padding:   "5rem 0",
};

export const emptyPrimaryTextStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  fontFamily:   typography.fontBody,
  fontSize:     typography.lg,
  color:        colors.textPrimary,
  marginBottom: "0.5rem",
});

export const emptySubTextStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  fontFamily:   typography.fontBody,
  fontSize:     typography.sm,
  color:        colors.textMuted,
  marginBottom: "1.5rem",
});

export const emptyShopButtonStyles = (
  typography: Typography,
  colors:     Colors,
  radius:     Radius,
): CSSProperties => ({
  display:     "inline-flex",
  alignItems:  "center",
  gap:         8,
  background:  colors.accentPrimary,
  color:       colors.textOnAccent,
  borderRadius: radius?.full,
  padding:     "0.875rem 2rem",
  fontFamily:  typography.fontBody,
  fontWeight:  typography.weightMedium,
  cursor:      "pointer",
});

// ── Grid ──────────────────────────────────────────────────────

export const gridStyles = (isMobile: boolean): CSSProperties => ({
  display:             "grid",
  gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fill, minmax(220px, 1fr))",
  gap:                 isMobile ? "0.75rem" : "1.25rem",
});

// ── Card ──────────────────────────────────────────────────────

export const cardStyles = (
  colors:  Colors,
  radius:  Radius,
  shadows: Shadows,
): CSSProperties => ({
  background:   colors.bgCard,
  borderRadius: radius?.xl,
  overflow:     "hidden",
  border:       `1px solid ${colors.borderLight}`,
  boxShadow:    shadows?.sm,
});

export const cardImageAreaStyles = (
  bg:       string,
  isMobile: boolean,
): CSSProperties => ({
  height:         isMobile ? 130 : 180,
  background:     bg,
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
  fontSize:       "3rem",
  position:       "relative",
});

export const removeButtonStyles = (
  colors:  Colors,
  radius:  Radius,
  shadows: Shadows,
): CSSProperties => ({
  position:       "absolute",
  top:            8,
  right:          8,
  width:          28,
  height:         28,
  borderRadius:   radius?.full,
  background:     colors.bgCard,
  border:         "none",
  cursor:         "pointer",
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
  boxShadow:      shadows?.sm,
});

export const cardBodyStyles = (isMobile: boolean): CSSProperties => ({
  padding: isMobile ? "0.75rem" : "1rem",
});

export const cardNameLinkStyles = (
  typography: Typography,
  colors:     Colors,
  isMobile:   boolean,
): CSSProperties => ({
  fontFamily:     typography.fontBody,
  fontSize:       isMobile ? typography.xs : typography.sm,
  fontWeight:     typography.weightMedium,
  color:          colors.textPrimary,
  textDecoration: "none",
  display:        "block",
  marginBottom:   "0.375rem",
});

export const cardPriceStyles = (
  typography:  Typography,
  colors:      Colors,
  isMobile:    boolean,
  hasSalePrice:boolean,
): CSSProperties => ({
  fontFamily: typography.fontBody,
  fontSize:   isMobile ? typography.xs : typography.sm,
  fontWeight: typography.weightBold,
  color:      hasSalePrice ? colors.accentPrimary : colors.textPrimary,
});

export const addToCartButtonStyles = (
  typography:  Typography,
  colors:      Colors,
  transitions: Theme["transitions"],
  radius:      Radius,
  isMobile:    boolean,
  isInCart:    boolean,
): CSSProperties => ({
  display:     "flex",
  alignItems:  "center",
  gap:         5,
  padding:     isMobile ? "0.35rem 0.6rem" : "0.4rem 0.875rem",
  borderRadius: radius?.full,
  background:  isInCart ? colors.accentPrimary : colors.bgSecondary,
  border:      "none",
  cursor:      "pointer",
  fontFamily:  typography.fontBody,
  fontSize:    isMobile ? "0.68rem" : typography.xs,
  fontWeight:  typography.weightMedium,
  color:       isInCart ? "#fff" : colors.textSecondary,
  transition:  `all ${transitions?.fast}`,
});