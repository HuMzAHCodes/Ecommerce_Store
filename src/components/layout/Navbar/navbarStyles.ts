import type { CSSProperties } from "react";
import type { Theme }         from "../../../theme/themes";

type Colors     = Theme["colors"];
type Typography = Theme["typography"];
type Radius     = Theme["radius"];
type Shadows    = Theme["shadows"];

// ── Palette constants ─────────────────────────────────────────

export const NAV_HOVER_BG   = "rgba(1, 62, 55, 0.08)";
export const NAV_ACTIVE_BG  = "rgba(1, 62, 55, 0.12)";
export const NAV_HOVER_COLOR = "#013e37";

export const hexToRgba = (hex: string, alpha: number): string => {
  const h = hex.replace("#", "");
  if (h.length !== 6) return hex;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// ── Nav shell ─────────────────────────────────────────────────

export const navShellStyles = (
  colors:     Colors,
  shadows:    Shadows,
  transitions: Theme["transitions"],
  isScrolled: boolean,
): CSSProperties => ({
  position:             "sticky",
  top:                  0,
  zIndex:               100,
  background:           isScrolled ? hexToRgba(colors.navBg, 0.20) : colors.navBg,
  backdropFilter:       isScrolled ? "blur(18px) saturate(1.4)" : "none",
  WebkitBackdropFilter: isScrolled ? "blur(18px) saturate(1.4)" : "none",
  borderBottom:         `1px solid ${isScrolled ? colors.borderMedium : colors.navBorder}`,
  boxShadow:            isScrolled ? shadows?.sm : "none",
  transition:           `background ${transitions?.normal}, box-shadow ${transitions?.normal}, border-color ${transitions?.normal}, backdrop-filter ${transitions?.normal}`,
});

export const navInnerStyles: CSSProperties = {
  maxWidth:       1280,
  margin:         "0 auto",
  padding:        "0 1.5rem",
  height:         64,
  display:        "flex",
  alignItems:     "center",
  justifyContent: "space-between",
  gap:            "1.5rem",
};

// ── Logo ──────────────────────────────────────────────────────

export const logoStyles = (
  typography:  Typography,
  colors:      Colors,
  transitions: Theme["transitions"],
  radius:      Radius,
): CSSProperties => ({
  fontFamily:     typography.fontDisplay,
  fontSize:       typography["2xl"],
  fontWeight:     typography.weightMedium,
  color:          colors.textPrimary,
  textDecoration: "none",
  letterSpacing:  "0.06em",
  flexShrink:     0,
  padding:        "0.35rem 0.6rem",
  borderRadius:   radius?.md,
  transition:     `color ${transitions?.fast}, transform ${transitions?.fast}, background ${transitions?.fast}`,
});

// ── Desktop nav link ──────────────────────────────────────────

export const desktopNavLinkStyles = (
  typography:  Typography,
  colors:      Colors,
  transitions: Theme["transitions"],
  radius:      Radius,
  isActive:    boolean,
): CSSProperties => ({
  display:        "inline-flex",
  alignItems:     "center",
  gap:            4,
  padding:        "0.5rem 0.875rem",
  borderRadius:   radius?.full,
  fontFamily:     typography.fontBody,
  fontSize:       typography.sm,
  fontWeight:     isActive ? typography.weightMedium : typography.weightRegular,
  color:          isActive ? colors.accentPrimary : colors.navText,
  background:     isActive ? NAV_ACTIVE_BG : "transparent",
  textDecoration: "none",
  transition:     `all ${transitions?.fast}`,
  whiteSpace:     "nowrap",
});

// ── Dropdown panel ────────────────────────────────────────────

export const dropdownPanelStyles = (
  colors:  Colors,
  radius:  Radius,
  shadows: Shadows,
): CSSProperties => ({
  position:     "absolute",
  top:          "calc(100% + 4px)",
  left:         "50%",
  transform:    "translateX(-50%)",
  background:   colors.bgCard,
  borderRadius: radius?.lg,
  boxShadow:    shadows?.lg,
  border:       `1px solid ${colors.borderLight}`,
  padding:      "0.5rem",
  minWidth:     160,
  zIndex:       200,
});

export const dropdownItemStyles = (
  typography:  Typography,
  colors:      Colors,
  transitions: Theme["transitions"],
  radius:      Radius,
): CSSProperties => ({
  display:        "block",
  padding:        "0.5rem 0.875rem",
  borderRadius:   radius?.md,
  fontFamily:     typography.fontBody,
  fontSize:       typography.sm,
  color:          colors.textSecondary,
  textDecoration: "none",
  transition:     `all ${transitions?.fast}`,
});

// ── Icon button ───────────────────────────────────────────────

export const iconButtonStyles = (
  radius:      Radius,
  transitions: Theme["transitions"],
): CSSProperties => ({
  position:       "relative",
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
  width:          38,
  height:         38,
  borderRadius:   radius?.full,
  background:     "transparent",
  border:         "none",
  cursor:         "pointer",
  color:          "#111111",
  transition:     `background ${transitions?.fast}, color ${transitions?.fast}, transform ${transitions?.fast}`,
});

// ── Search bar ────────────────────────────────────────────────

export const searchPanelStyles = (
  colors:      Colors,
  isScrolled:  boolean,
): CSSProperties => ({
  overflow:   "hidden",
  borderTop:  `1px solid ${colors.borderLight}`,
  background: isScrolled ? hexToRgba(colors.navBg, 0.38) : colors.bgSecondary,
});

export const searchInnerStyles: CSSProperties = {
  maxWidth:   1280,
  margin:     "0 auto",
  padding:    "0.875rem 1.5rem",
  display:    "flex",
  gap:        "0.75rem",
  alignItems: "center",
};

export const searchInputStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  flex:       1,
  background: "transparent",
  border:     "none",
  outline:    "none",
  fontFamily: typography.fontBody,
  fontSize:   typography.base,
  color:      colors.textPrimary,
});

// ── Mobile drawer ─────────────────────────────────────────────

export const mobileOverlayStyles = (colors: Colors): CSSProperties => ({
  position:   "fixed",
  inset:      0,
  zIndex:     98,
  background: colors.bgOverlay,
});

export const mobileDrawerStyles = (
  colors:  Colors,
  shadows: Shadows,
): CSSProperties => ({
  position:   "fixed",
  top:        0,
  right:      0,
  bottom:     0,
  zIndex:     99,
  width:      "min(320px, 85vw)",
  background: colors.bgCard,
  padding:    "1.5rem",
  overflowY:  "auto",
  boxShadow:  shadows?.xl,
});

export const mobileLinkStyles = (
  typography:  Typography,
  colors:      Colors,
  transitions: Theme["transitions"],
  radius:      Radius,
  isActive:    boolean,
): CSSProperties => ({
  display:        "block",
  padding:        "0.75rem 1rem",
  borderRadius:   radius?.md,
  fontFamily:     typography.fontBody,
  fontSize:       typography.base,
  fontWeight:     typography.weightMedium,
  color:          isActive ? colors.accentPrimary : colors.textPrimary,
  background:     isActive ? NAV_ACTIVE_BG : "transparent",
  textDecoration: "none",
  transition:     `all ${transitions?.fast}`,
});

export const mobileSubLinkStyles = (
  typography:  Typography,
  colors:      Colors,
  transitions: Theme["transitions"],
  radius:      Radius,
): CSSProperties => ({
  display:        "block",
  padding:        "0.5rem 1rem 0.5rem 2rem",
  borderRadius:   radius?.md,
  fontFamily:     typography.fontBody,
  fontSize:       typography.sm,
  color:          colors.textSecondary,
  textDecoration: "none",
  transition:     `all ${transitions?.fast}`,
});

export const mobileAuthLinkStyles = (
  typography:  Typography,
  colors:      Colors,
  transitions: Theme["transitions"],
  radius:      Radius,
): CSSProperties => ({
  display:        "flex",
  alignItems:     "center",
  gap:            "0.75rem",
  padding:        "0.75rem 1rem",
  borderRadius:   radius?.md,
  fontFamily:     typography.fontBody,
  fontSize:       typography.sm,
  color:          colors.textPrimary,
  textDecoration: "none",
  background:     colors.bgSecondary,
  transition:     `all ${transitions?.fast}`,
});

// ── Count badge ───────────────────────────────────────────────

export const countBadgeStyles = (color: string): CSSProperties => ({
  position:       "absolute",
  top:            2,
  right:          2,
  minWidth:       17,
  height:         17,
  borderRadius:   "9999px",
  background:     color,
  color:          "#fff",
  fontSize:       "0.6rem",
  fontWeight:     700,
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
  padding:        "0 3px",
  lineHeight:     1,
});