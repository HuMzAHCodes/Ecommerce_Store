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

export const headerBandStyles = (colors: Colors): CSSProperties => ({
  background:   colors.bgSecondary,
  borderBottom: `1px solid ${colors.borderLight}`,
  padding:      "2.5rem 1.5rem 2rem",
});

export const headerInnerStyles: CSSProperties = {
  maxWidth: 900,
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

// ── Orders list ───────────────────────────────────────────────

export const ordersListStyles: CSSProperties = {
  maxWidth:      900,
  margin:        "0 auto",
  padding:       "2.5rem 1.5rem",
  display:       "flex",
  flexDirection: "column",
  gap:           "1.25rem",
};

// ── Order card ────────────────────────────────────────────────

export const cardStyles = (
  colors:  Colors,
  radius:  Radius,
  shadows: Shadows,
): CSSProperties => ({
  background:   colors.bgCard,
  borderRadius: radius?.xl,
  border:       `1px solid ${colors.borderLight}`,
  boxShadow:    shadows?.sm,
  overflow:     "hidden",
});

export const cardHeaderStyles = (colors: Colors): CSSProperties => ({
  display:        "flex",
  alignItems:     "center",
  justifyContent: "space-between",
  padding:        "1.25rem 1.5rem",
  borderBottom:   `1px solid ${colors.borderLight}`,
  flexWrap:       "wrap",
  gap:            "0.75rem",
});

export const cardMetaGroupStyles: CSSProperties = {
  display:  "flex",
  gap:      "2rem",
  flexWrap: "wrap",
};

export const metaLabelStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  fontFamily:   typography.fontBody,
  fontSize:     typography.xs,
  color:        colors.textMuted,
  marginBottom: 2,
});

export const metaValueStyles = (
  typography: Typography,
  colors:     Colors,
  isBold?:    boolean,
  isAccent?:  boolean,
): CSSProperties => ({
  fontFamily: typography.fontBody,
  fontSize:   typography.sm,
  fontWeight: isBold ? typography.weightBold : typography.weightRegular,
  color:      isAccent ? colors.accentPrimary : colors.textPrimary,
});

export const statusBadgeStyles = (
  typography: Typography,
  radius:     Radius,
  color:      string,
  bg:         string,
): CSSProperties => ({
  display:     "inline-flex",
  alignItems:  "center",
  gap:         5,
  padding:     "4px 12px",
  borderRadius: radius?.full,
  background:  bg,
  color,
  fontFamily:  typography.fontBody,
  fontSize:    typography.xs,
  fontWeight:  typography.weightMedium,
});

// ── Order items list ──────────────────────────────────────────

export const itemsAreaStyles: CSSProperties = {
  padding:       "1rem 1.5rem",
  display:       "flex",
  flexDirection: "column",
  gap:           "0.625rem",
};

export const itemRowStyles: CSSProperties = {
  display:        "flex",
  justifyContent: "space-between",
};

export const itemNameStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  fontFamily: typography.fontBody,
  fontSize:   typography.sm,
  color:      colors.textSecondary,
});

export const itemPriceStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  fontFamily: typography.fontBody,
  fontSize:   typography.sm,
  fontWeight: typography.weightMedium,
  color:      colors.textPrimary,
});

// ── Empty state ───────────────────────────────────────────────

export const emptyStateStyles: CSSProperties = {
  textAlign: "center",
  padding:   "4rem 0",
};

export const emptyLinkStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  color:      colors.accentPrimary,
  fontFamily: typography.fontBody,
  fontSize:   typography.sm,
});