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

// ── Banner ────────────────────────────────────────────────────

export const bannerStyles = (
  bannerColor: string,
  colors:      Colors,
  isMobile:    boolean,
): CSSProperties => ({
  background:   `linear-gradient(135deg, ${bannerColor}88 0%, ${colors.bgSecondary} 100%)`,
  borderBottom: `1px solid ${colors.borderLight}`,
  padding:      isMobile ? "3rem 1.25rem 2.5rem" : "4rem 1.5rem 3.5rem",
  textAlign:    "center",
});

export const bannerEmojiStyles = (isMobile: boolean): CSSProperties => ({
  fontSize:     isMobile ? "3rem" : "4rem",
  marginBottom: "1rem",
});

export const bannerTitleStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  fontFamily:   typography.fontDisplay,
  color:        colors.textPrimary,
  fontStyle:    "italic",
  marginBottom: "0.875rem",
});

export const bannerDescriptionStyles = (
  typography: Typography,
  colors:     Colors,
  isMobile:   boolean,
): CSSProperties => ({
  fontFamily:   typography.fontBody,
  color:        colors.textSecondary,
  fontSize:     isMobile ? typography.base : typography.lg,
  maxWidth:     520,
  margin:       "0 auto 2rem",
  lineHeight:   1.7,
});

export const tabRowStyles: CSSProperties = {
  display:        "flex",
  justifyContent: "center",
  gap:            "0.5rem",
  flexWrap:       "wrap",
};

export const tabLinkStyles = (
  typography:  Typography,
  colors:      Colors,
  transitions: Theme["transitions"],
  radius:      Radius,
  isActive:    boolean,
): CSSProperties => ({
  padding:        "0.5rem 1.25rem",
  borderRadius:   radius?.full,
  fontFamily:     typography.fontBody,
  fontSize:       typography.sm,
  fontWeight:     isActive ? typography.weightMedium : typography.weightRegular,
  background:     isActive ? colors.accentPrimary : colors.bgCard,
  color:          isActive ? colors.textOnAccent   : colors.textSecondary,
  textDecoration: "none",
  border:         `1px solid ${isActive ? colors.accentPrimary : colors.borderLight}`,
  transition:     `all ${transitions?.normal}`,
});

// ── Products grid ─────────────────────────────────────────────

export const gridContainerStyles = (isMobile: boolean): CSSProperties => ({
  maxWidth: 1280,
  margin:   "0 auto",
  padding:  isMobile ? "2rem 1.25rem" : "3rem 1.5rem",
});

export const gridStyles = (isMobile: boolean): CSSProperties => ({
  display:             "grid",
  gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fill, minmax(240px, 1fr))",
  gap:                 isMobile ? "0.875rem" : "1.5rem",
});

// ── Product card ──────────────────────────────────────────────

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
  height:         isMobile ? 150 : 210,
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
  top:           10,
  left:          10,
  background:    badgeColor,
  color:         "#fff",
  fontSize:      "0.6rem",
  fontWeight:    700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  padding:       "3px 9px",
  borderRadius:  radius?.full,
  fontFamily:    "inherit",
});

export const wishlistButtonStyles = (
  colors:  Colors,
  radius:  Radius,
  shadows: Shadows,
): CSSProperties => ({
  position:       "absolute",
  top:            10,
  right:          10,
  width:          32,
  height:         32,
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
  padding: isMobile ? "0.875rem" : "1.25rem",
});

export const addToCartButtonStyles = (
  colors:      Colors,
  transitions: Theme["transitions"],
  radius:      Radius,
  isInCart:    boolean,
): CSSProperties => ({
  width:          32,
  height:         32,
  borderRadius:   radius?.full,
  background:     isInCart ? colors.accentPrimary : colors.bgSecondary,
  border:         "none",
  cursor:         "pointer",
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
  transition:     `background ${transitions?.fast}`,
});

// ── Browse all CTA ────────────────────────────────────────────

export const browseAllWrapperStyles: CSSProperties = {
  textAlign:  "center",
  marginTop:  "3rem",
};

export const browseAllButtonStyles = (
  typography: Typography,
  colors:     Colors,
  radius:     Radius,
): CSSProperties => ({
  display:        "inline-flex",
  alignItems:     "center",
  gap:            8,
  background:     "transparent",
  color:          colors.textPrimary,
  border:         `1.5px solid ${colors.borderMedium}`,
  borderRadius:   radius?.full,
  padding:        "0.875rem 2rem",
  fontFamily:     typography.fontBody,
  fontWeight:     typography.weightMedium,
  cursor:         "pointer",
});