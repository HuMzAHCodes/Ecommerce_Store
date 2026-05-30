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

// ── Breadcrumb ────────────────────────────────────────────────

export const breadcrumbBandStyles = (colors: Colors): CSSProperties => ({
  background:   colors.bgSecondary,
  borderBottom: `1px solid ${colors.borderLight}`,
  padding:      "0.75rem 1.25rem",
});

export const breadcrumbInnerStyles: CSSProperties = {
  maxWidth:   1280,
  margin:     "0 auto",
  display:    "flex",
  alignItems: "center",
  gap:        5,
  flexWrap:   "wrap",
};

export const breadcrumbLinkStyles = (colors: Colors): CSSProperties => ({
  color:          colors.textMuted,
  textDecoration: "none",
});

// ── Main grid ─────────────────────────────────────────────────

export const mainGridStyles = (isMobile: boolean): CSSProperties => ({
  maxWidth:            1280,
  margin:              "0 auto",
  padding:             isMobile ? "1.5rem 1.25rem" : "3rem 1.5rem",
  display:             "grid",
  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
  gap:                 isMobile ? "2rem" : "4rem",
  alignItems:          "start",
});

// ── Image gallery ─────────────────────────────────────────────

export const mainImageStyles = (
  bg:       string,
  isMobile: boolean,
  radius:   Radius,
  shadows:  Shadows,
): CSSProperties => ({
  height:         isMobile ? 280 : 440,
  borderRadius:   radius?.xl,
  background:     bg,
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
  marginBottom:   "0.875rem",
  boxShadow:      shadows?.lg,
  position:       "relative",
});

export const imageBadgeStyles = (
  badgeColor: string,
  typography: Typography,
  radius:     Radius,
): CSSProperties => ({
  position:      "absolute",
  top:           14,
  left:          14,
  background:    badgeColor,
  color:         "#fff",
  fontSize:      "0.66rem",
  fontWeight:    600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  padding:       "4px 10px",
  borderRadius:  radius?.full,
  fontFamily:    "inherit",
});

export const thumbnailRowStyles: CSSProperties = {
  display: "flex",
  gap:     "0.625rem",
};

export const thumbnailButtonStyles = (
  bg:          string,
  isActive:    boolean,
  isMobile:    boolean,
  colors:      Colors,
  radius:      Radius,
  transitions: Theme["transitions"],
): CSSProperties => ({
  flex:           1,
  height:         isMobile ? 68 : 88,
  borderRadius:   radius?.lg,
  background:     bg,
  border:         `2px solid ${isActive ? colors.accentPrimary : colors.borderLight}`,
  cursor:         "pointer",
  transition:     `border-color ${transitions?.fast}`,
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
});

// ── Product info ──────────────────────────────────────────────

export const categoryLinkStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  fontFamily:     typography.fontBody,
  fontSize:       typography.xs,
  fontWeight:     typography.weightMedium,
  color:          colors.accentPrimary,
  textDecoration: "none",
  letterSpacing:  "0.08em",
  textTransform:  "uppercase",
});

export const productTitleStyles = (
  typography: Typography,
  colors:     Colors,
  isMobile:   boolean,
): CSSProperties => ({
  fontFamily: typography.fontDisplay,
  color:      colors.textPrimary,
  margin:     "0.5rem 0 0.75rem",
  fontSize:   isMobile ? "clamp(1.75rem, 5vw, 2.25rem)" : undefined,
});

// ── Size selector ─────────────────────────────────────────────

export const sizeLabelStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  fontFamily:   typography.fontBody,
  fontSize:     typography.sm,
  fontWeight:   typography.weightMedium,
  color:        colors.textPrimary,
  marginBottom: "0.5rem",
});

export const sizeButtonStyles = (
  typography:  Typography,
  colors:      Colors,
  transitions: Theme["transitions"],
  radius:      Radius,
  isActive:    boolean,
): CSSProperties => ({
  padding:      "0.5rem 1rem",
  borderRadius: radius?.full,
  border:       `1.5px solid ${isActive ? colors.accentPrimary : colors.borderLight}`,
  background:   isActive ? colors.accentLight  : "transparent",
  color:        isActive ? colors.accentPrimary : colors.textSecondary,
  fontFamily:   typography.fontBody,
  fontSize:     typography.sm,
  cursor:       "pointer",
  transition:   `all ${transitions?.fast}`,
});

// ── Actions ───────────────────────────────────────────────────

export const qtyControlStyles = (
  colors: Colors,
  radius: Radius,
): CSSProperties => ({
  display:      "flex",
  alignItems:   "center",
  border:       `1px solid ${colors.borderLight}`,
  borderRadius: radius?.full,
  overflow:     "hidden",
});

export const qtyButtonStyles = (colors: Colors): CSSProperties => ({
  width:          38,
  height:         42,
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
  background:     "transparent",
  border:         "none",
  cursor:         "pointer",
  color:          colors.textPrimary,
});

export const qtyValueStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  width:      34,
  textAlign:  "center",
  fontFamily: typography.fontBody,
  fontSize:   typography.sm,
  fontWeight: typography.weightMedium,
  color:      colors.textPrimary,
});

export const addToCartButtonStyles = (
  typography: Typography,
  colors:     Colors,
  radius:     Radius,
  shadows:    Shadows,
  isMobile:   boolean,
): CSSProperties => ({
  flex:           1,
  minWidth:       isMobile ? "100%" : "auto",
  height:         42,
  borderRadius:   radius?.full,
  background:     colors.accentPrimary,
  color:          colors.textOnAccent,
  border:         "none",
  cursor:         "pointer",
  fontFamily:     typography.fontBody,
  fontSize:       typography.base,
  fontWeight:     typography.weightMedium,
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
  gap:            8,
  boxShadow:      shadows?.md,
});

export const wishlistButtonStyles = (
  colors:      Colors,
  radius:      Radius,
  isWishlisted:boolean,
): CSSProperties => ({
  width:          42,
  height:         42,
  borderRadius:   radius?.full,
  border:         `1.5px solid ${isWishlisted ? colors.accentPrimary : colors.borderLight}`,
  background:     isWishlisted ? colors.accentLight : "transparent",
  cursor:         "pointer",
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
  flexShrink:     0,
});

// ── Perks ─────────────────────────────────────────────────────

export const perksContainerStyles = (
  colors: Colors,
  radius: Radius,
): CSSProperties => ({
  display:       "flex",
  flexDirection: "column",
  gap:           "0.5rem",
  padding:       "1.1rem",
  background:    colors.bgSecondary,
  borderRadius:  radius?.lg,
  marginBottom:  "1.5rem",
});

export const perkRowStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  display:    "flex",
  alignItems: "center",
  gap:        9,
  fontFamily: typography.fontBody,
  fontSize:   typography.sm,
  color:      colors.textSecondary,
});

// ── Tabs ──────────────────────────────────────────────────────

export const tabBarStyles = (colors: Colors): CSSProperties => ({
  borderBottom: `1px solid ${colors.borderLight}`,
  display:      "flex",
  marginBottom: "1.1rem",
});

export const tabButtonStyles = (
  typography:  Typography,
  colors:      Colors,
  transitions: Theme["transitions"],
  isMobile:    boolean,
  isActive:    boolean,
): CSSProperties => ({
  padding:      "0.6rem 1rem",
  border:       "none",
  background:   "transparent",
  cursor:       "pointer",
  fontFamily:   typography.fontBody,
  fontSize:     isMobile ? typography.xs : typography.sm,
  fontWeight:   isActive ? typography.weightMedium : typography.weightRegular,
  color:        isActive ? colors.accentPrimary : colors.textMuted,
  borderBottom: `2px solid ${isActive ? colors.accentPrimary : "transparent"}`,
  marginBottom: -1,
  transition:   `all ${transitions?.fast}`,
});

// ── Reviews ───────────────────────────────────────────────────

export const reviewCardStyles = (
  colors: Colors,
  radius: Radius,
): CSSProperties => ({
  padding:      "1rem",
  background:   colors.bgSecondary,
  borderRadius: radius?.lg,
  border:       `1px solid ${colors.borderLight}`,
});

export const reviewHeaderStyles: CSSProperties = {
  display:        "flex",
  alignItems:     "center",
  justifyContent: "space-between",
  marginBottom:   "0.35rem",
};