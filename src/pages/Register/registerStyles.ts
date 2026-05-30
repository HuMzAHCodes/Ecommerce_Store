import type { CSSProperties } from "react";
import type { Theme }         from "../../theme/themes";

type Colors     = Theme["colors"];
type Typography = Theme["typography"];
type Radius     = Theme["radius"];

export const pageStyles = (): CSSProperties => ({
  minHeight:      "100vh",
  display:        "flex",
  flexDirection:  "column",
  alignItems:     "center",
  justifyContent: "center",
  padding:        "2rem 1.25rem",
  gap:            "1.5rem",
});

export const brandLogoStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  fontFamily:     typography.fontDisplay,
  fontSize:       typography["3xl"],
  fontWeight:     typography.weightBold,
  color:          colors.textPrimary,
  textDecoration: "none",
  letterSpacing:  "0.06em",
});

export const brandSubtitleStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  fontFamily: typography.fontBody,
  fontSize:   typography.sm,
  color:      colors.textMuted,
  marginTop:  "0.375rem",
});

export const footerTextStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  fontFamily: typography.fontBody,
  fontSize:   typography.sm,
  color:      colors.textMuted,
});

export const footerLinkStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  color:      colors.accentPrimary,
  fontWeight: typography.weightMedium,
});

export const buildClerkAppearance = (
  colors: Colors,
  typography: Typography,
  radius: Radius,
) => ({
  variables: {
    colorPrimary:         colors.accentPrimary,
    colorBackground:      colors.bgCard,
    colorText:            colors.textPrimary,
    colorTextSecondary:   colors.textSecondary,
    colorInputBackground: colors.bgPrimary,
    colorInputText:       colors.textPrimary,
    borderRadius:         radius?.md ?? "8px",
    fontFamily:           typography.fontBody,
  },
  elements: {
    card:              { boxShadow: "none", border: `1px solid ${colors.borderLight}` },
    headerTitle:       { fontFamily: typography.fontDisplay, fontStyle: "italic" },
    formButtonPrimary: { fontFamily: typography.fontBody, fontWeight: String(typography.weightMedium) },
  },
});