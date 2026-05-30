import type { CSSProperties } from "react";
import type { Theme }         from "../../../theme/themes";

type Colors     = Theme["colors"];
type Typography = Theme["typography"];
type Radius     = Theme["radius"];

// ── Palette helpers ───────────────────────────────────────────
// Footer uses a fixed green/butter palette on top of the theme green

export const footerPalette = (colors: Colors) => ({
  green:        colors.accentPrimary,
  greenDark:    colors.accentHover,
  butter:       colors.textOnAccent,
  butterSoft:   "rgba(255, 239, 179, 0.82)",
  butterMuted:  "rgba(255, 239, 179, 0.58)",
  borderButter: "rgba(255, 239, 179, 0.22)",
});

// ── Shell ─────────────────────────────────────────────────────

export const footerShellStyles = (
  colors: Colors,
): CSSProperties => ({
  background: colors.accentPrimary,
  borderTop:  `1px solid rgba(255, 239, 179, 0.22)`,
  marginTop:  "auto",
});

export const footerGridStyles: CSSProperties = {
  maxWidth:            1280,
  margin:              "0 auto",
  padding:             "4rem 1.5rem 3rem",
  display:             "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap:                 "2.5rem",
};

// ── Brand column ──────────────────────────────────────────────

export const brandLogoStyles = (
  typography: Typography,
  butter:     string,
): CSSProperties => ({
  fontFamily:     typography.fontDisplay,
  fontSize:       typography["2xl"],
  fontWeight:     typography.weightMedium,
  color:          butter,
  textDecoration: "none",
  letterSpacing:  "0.06em",
  display:        "block",
  marginBottom:   "1rem",
});

export const brandTaglineStyles = (
  typography:  Typography,
  butterMuted: string,
): CSSProperties => ({
  fontFamily:   typography.fontBody,
  fontSize:     typography.sm,
  color:        butterMuted,
  lineHeight:   1.7,
  marginBottom: "1.5rem",
  maxWidth:     220,
});

export const socialRowStyles: CSSProperties = {
  display: "flex",
  gap:     "0.5rem",
};

export const socialButtonStyles = (
  greenDark:   string,
  butterSoft:  string,
  radius:      Radius,
  transitions: Theme["transitions"],
): CSSProperties => ({
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
  width:          36,
  height:         36,
  borderRadius:   radius?.full,
  background:     greenDark,
  color:          butterSoft,
  transition:     `background ${transitions?.fast}, color ${transitions?.fast}`,
});

// ── Link column ───────────────────────────────────────────────

export const columnHeadingStyles = (
  typography: Typography,
  butter:     string,
): CSSProperties => ({
  fontFamily:    typography.fontBody,
  fontSize:      typography.sm,
  fontWeight:    typography.weightBold,
  color:         butter,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  marginBottom:  "1rem",
});

export const columnNavStyles: CSSProperties = {
  display:       "flex",
  flexDirection: "column",
};

export const columnLinkStyles = (
  typography:  Typography,
  butterSoft:  string,
  transitions: Theme["transitions"],
): CSSProperties => ({
  fontFamily:     typography.fontBody,
  fontSize:       typography.sm,
  color:          butterSoft,
  textDecoration: "none",
  display:        "inline-block",
  transition:     `color ${transitions?.fast}`,
  lineHeight:     2,
});

// ── Newsletter ────────────────────────────────────────────────

export const newsletterHeadingStyles = (
  typography: Typography,
  butter:     string,
): CSSProperties => ({
  fontFamily:    typography.fontBody,
  fontSize:      typography.sm,
  fontWeight:    typography.weightBold,
  color:         butter,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  marginBottom:  "1rem",
});

export const newsletterSubtextStyles = (
  typography:  Typography,
  butterMuted: string,
): CSSProperties => ({
  fontFamily:   typography.fontBody,
  fontSize:     typography.sm,
  color:        butterMuted,
  marginBottom: "1rem",
  lineHeight:   1.6,
});

export const newsletterFormStyles: CSSProperties = {
  display:       "flex",
  flexDirection: "column",
  gap:           "0.5rem",
};

export const newsletterInputStyles = (
  typography:   Typography,
  butter:       string,
  greenDark:    string,
  borderButter: string,
  radius:       Radius,
): CSSProperties => ({
  width:      "100%",
  padding:    "0.6rem 0.875rem",
  borderRadius: radius?.md,
  border:     `1px solid ${borderButter}`,
  background: greenDark,
  fontFamily: typography.fontBody,
  fontSize:   typography.sm,
  color:      butter,
  outline:    "none",
});

export const newsletterButtonStyles = (
  typography: Typography,
  butter:     string,
  green:      string,
  radius:     Radius,
): CSSProperties => ({
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
  gap:            "0.5rem",
  padding:        "0.6rem 1rem",
  borderRadius:   radius?.full,
  background:     butter,
  color:          green,
  fontFamily:     typography.fontBody,
  fontSize:       typography.sm,
  fontWeight:     typography.weightMedium,
  border:         "none",
  cursor:         "pointer",
});

export const newsletterSuccessStyles = (
  typography: Typography,
  butter:     string,
): CSSProperties => ({
  color:      butter,
  fontSize:   typography.sm,
  fontFamily: typography.fontBody,
});

// ── Bottom bar ────────────────────────────────────────────────

export const bottomBarOuterStyles = (borderButter: string): CSSProperties => ({
  borderTop: `1px solid ${borderButter}`,
  padding:   "1.25rem 1.5rem",
  maxWidth:  1280,
  margin:    "0 auto",
  display:   "flex",
  alignItems:     "center",
  justifyContent: "space-between",
  flexWrap:  "wrap",
  gap:       "0.75rem",
});

export const copyrightStyles = (
  typography:  Typography,
  butterMuted: string,
): CSSProperties => ({
  fontFamily: typography.fontBody,
  fontSize:   typography.xs,
  color:      butterMuted,
  margin:     0,
});

export const legalLinksRowStyles: CSSProperties = {
  display: "flex",
  gap:     "1.25rem",
};

export const legalLinkStyles = (
  typography:  Typography,
  butterMuted: string,
): CSSProperties => ({
  fontFamily:     typography.fontBody,
  fontSize:       typography.xs,
  color:          butterMuted,
  textDecoration: "none",
});