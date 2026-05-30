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

// ── Header ────────────────────────────────────────────────────

export const headerBandStyles = (
  colors:   Colors,
  isMobile: boolean,
): CSSProperties => ({
  background:   colors.bgSecondary,
  borderBottom: `1px solid ${colors.borderLight}`,
  padding:      isMobile ? "2rem 1.25rem 1.5rem" : "3rem 1.5rem 2rem",
});

export const headerInnerStyles: CSSProperties = {
  maxWidth: 1280,
  margin:   "0 auto",
};

export const headerTitleStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  fontFamily:   typography.fontDisplay,
  color:        colors.textPrimary,
  fontStyle:    "italic",
  marginBottom: "0.25rem",
});

export const headerCountStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  fontFamily: typography.fontBody,
  color:      colors.textMuted,
  fontSize:   typography.sm,
});

// ── Layout grid ───────────────────────────────────────────────

export const contentGridStyles = (isMobile: boolean): CSSProperties => ({
  maxWidth:            1280,
  margin:              "0 auto",
  padding:             isMobile ? "1.25rem" : "2rem 1.5rem",
  display:             "grid",
  gridTemplateColumns: isMobile ? "1fr" : "240px 1fr",
  gap:                 "2rem",
  alignItems:          "start",
});

// ── Sidebar ───────────────────────────────────────────────────

export const sidebarStyles = (
  colors:  Colors,
  radius:  Radius,
  shadows: Shadows,
): CSSProperties => ({
  position:     "sticky",
  top:          80,
  background:   colors.bgCard,
  borderRadius: radius?.xl,
  padding:      "1.5rem",
  border:       `1px solid ${colors.borderLight}`,
  boxShadow:    shadows?.sm,
});

// ── Filters panel ─────────────────────────────────────────────

export const filterLabelStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  fontFamily:    typography.fontBody,
  fontSize:      typography.xs,
  fontWeight:    typography.weightBold,
  color:         colors.textPrimary,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  marginBottom:  "0.5rem",
  display:       "block",
});

export const filterSearchInputStyles = (
  typography: Typography,
  colors:     Colors,
  radius:     Radius,
): CSSProperties => ({
  width:        "100%",
  paddingLeft:  30,
  paddingRight: 10,
  paddingTop:   "0.55rem",
  paddingBottom:"0.55rem",
  border:       `1px solid ${colors.borderLight}`,
  borderRadius: radius?.md,
  fontFamily:   typography.fontBody,
  fontSize:     typography.sm,
  color:        colors.textPrimary,
  background:   colors.bgPrimary,
  outline:      "none",
});

export const categoryButtonStyles = (
  typography:  Typography,
  colors:      Colors,
  transitions: Theme["transitions"],
  radius:      Radius,
  isActive:    boolean,
): CSSProperties => ({
  textAlign:  "left",
  padding:    "0.45rem 0.75rem",
  borderRadius: radius?.md,
  border:     "none",
  cursor:     "pointer",
  fontFamily: typography.fontBody,
  fontSize:   typography.sm,
  fontWeight: isActive ? typography.weightMedium : typography.weightRegular,
  background: isActive ? colors.accentLight  : "transparent",
  color:      isActive ? colors.accentPrimary : colors.textSecondary,
  transition: `all ${transitions?.fast}`,
});

// ── Toolbar ───────────────────────────────────────────────────

export const toolbarStyles: CSSProperties = {
  display:        "flex",
  alignItems:     "center",
  justifyContent: "space-between",
  marginBottom:   "1rem",
  gap:            "0.75rem",
};

export const filterToggleButtonStyles = (
  typography: Typography,
  colors:     Colors,
  radius:     Radius,
): CSSProperties => ({
  display:     "flex",
  alignItems:  "center",
  gap:         6,
  padding:     "0.5rem 1rem",
  borderRadius: radius?.full,
  border:      `1px solid ${colors.borderLight}`,
  background:  colors.bgCard,
  fontFamily:  typography.fontBody,
  fontSize:    typography.sm,
  color:       colors.textPrimary,
  cursor:      "pointer",
});

export const sortSelectStyles = (
  typography: Typography,
  colors:     Colors,
  radius:     Radius,
): CSSProperties => ({
  appearance:   "none",
  padding:      "0.5rem 2rem 0.5rem 0.875rem",
  border:       `1px solid ${colors.borderLight}`,
  borderRadius: radius?.full,
  fontFamily:   typography.fontBody,
  fontSize:     typography.sm,
  color:        colors.textPrimary,
  background:   colors.bgCard,
  cursor:       "pointer",
  outline:      "none",
});

// ── Mobile filter drawer ──────────────────────────────────────

export const mobileOverlayStyles = (colors: Colors): CSSProperties => ({
  position:       "fixed",
  inset:          0,
  zIndex:         50,
  background:     colors.bgOverlay,
  backdropFilter: "blur(2px)",
});

export const mobileDrawerStyles = (
  colors:  Colors,
  radius:  Radius,
  shadows: Shadows,
): CSSProperties => ({
  position:     "fixed",
  bottom:       0,
  left:         0,
  right:        0,
  zIndex:       51,
  background:   colors.bgCard,
  borderRadius: `${radius?.xl} ${radius?.xl} 0 0`,
  padding:      "1.5rem",
  maxHeight:    "85vh",
  overflowY:    "auto",
  boxShadow:    shadows?.xl,
});

export const mobileDrawerShowButtonStyles = (
  typography: Typography,
  colors:     Colors,
  radius:     Radius,
): CSSProperties => ({
  width:        "100%",
  marginTop:    "1.25rem",
  padding:      "0.875rem",
  borderRadius: radius?.full,
  background:   colors.accentPrimary,
  color:        colors.textOnAccent,
  border:       "none",
  cursor:       "pointer",
  fontFamily:   typography.fontBody,
  fontSize:     typography.base,
  fontWeight:   typography.weightMedium,
});

// ── Product card ──────────────────────────────────────────────

export const cardWrapperStyles = (
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
  height:         isMobile ? 140 : 190,
  background:     bg,
  position:       "relative",
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
});

export const cardBadgeStyles = (
  badgeColor: string,
  typography: Typography,
  radius:     Radius,
): CSSProperties => ({
  position:      "absolute",
  top:           9,
  left:          9,
  background:    badgeColor,
  color:         "#fff",
  fontSize:      "0.58rem",
  fontWeight:    700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  padding:       "2px 7px",
  borderRadius:  radius?.full,
  fontFamily:    "inherit",
});

export const wishlistButtonStyles = (
  colors:  Colors,
  radius:  Radius,
  shadows: Shadows,
): CSSProperties => ({
  position:       "absolute",
  top:            9,
  right:          9,
  width:          30,
  height:         30,
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

export const addToCartButtonStyles = (
  colors:      Colors,
  transitions: Theme["transitions"],
  radius:      Radius,
  isInCart:    boolean,
): CSSProperties => ({
  width:        30,
  height:       30,
  borderRadius: radius?.full,
  background:   isInCart ? colors.accentPrimary : colors.bgSecondary,
  border:       "none",
  cursor:       "pointer",
  display:      "flex",
  alignItems:   "center",
  justifyContent:"center",
  transition:   `background ${transitions?.fast}`,
});

// ── Empty state ───────────────────────────────────────────────

export const emptyStateStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  textAlign:  "center",
  padding:    "4rem 0",
  color:      colors.textMuted,
  fontFamily: typography.fontBody,
});