import type { CSSProperties } from "react";
import type { Theme }         from "../../theme/themes";

type Colors      = Theme["colors"];
type Typography  = Theme["typography"];
type Radius      = Theme["radius"];
type Shadows     = Theme["shadows"];

// ── Overlay & Drawer shell ────────────────────────────────────

export const overlayStyles = (colors: Colors): CSSProperties => ({
  position:       "fixed",
  inset:          0,
  zIndex:         200,
  background:     colors.bgOverlay,
  backdropFilter: "blur(2px)",
});

export const drawerShellStyles = (
  colors:  Colors,
  shadows: Shadows,
): CSSProperties => ({
  position:        "fixed",
  top:             0, right: 0, bottom: 0,
  zIndex:          201,
  width:           "min(420px, 100vw)",
  background:      colors.bgCard,
  display:         "flex",
  flexDirection:   "column",
  boxShadow:       shadows?.xl,
});

// ── Header ────────────────────────────────────────────────────

export const headerWrapperStyles = (colors: Colors): CSSProperties => ({
  display:        "flex",
  alignItems:     "center",
  justifyContent: "space-between",
  padding:        "1.25rem 1.5rem",
  borderBottom:   `1px solid ${colors.borderLight}`,
  flexShrink:     0,
});

export const headerLeftStyles: CSSProperties = {
  display:    "flex",
  alignItems: "center",
  gap:        10,
};

export const headerTitleStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  fontFamily: typography.fontDisplay,
  fontSize:   typography.xl,
  color:      colors.textPrimary,
});

export const itemCountBadgeStyles = (
  colors:     Colors,
  typography: Typography,
  radius:     Radius,
): CSSProperties => ({
  background:  colors.accentPrimary,
  color:       "#fff",
  borderRadius: radius?.full,
  padding:     "1px 8px",
  fontFamily:  typography.fontBody,
  fontSize:    typography.xs,
  fontWeight:  typography.weightBold,
});

export const closeButtonStyles = (
  colors: Colors,
  radius: Radius,
): CSSProperties => ({
  width:          34,
  height:         34,
  borderRadius:   radius?.full,
  background:     colors.bgSecondary,
  border:         "none",
  cursor:         "pointer",
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
  color:          colors.textSecondary,
});

// ── Free shipping bar ─────────────────────────────────────────

export const shippingBarWrapperStyles = (colors: Colors): CSSProperties => ({
  padding:      "0.875rem 1.5rem",
  background:   colors.bgSecondary,
  borderBottom: `1px solid ${colors.borderLight}`,
  flexShrink:   0,
});

export const shippingBarLabelStyles = (
  colors:       Colors,
  typography:   Typography,
  isFreeShip:   boolean,
): CSSProperties => ({
  fontFamily:   typography.fontBody,
  fontSize:     typography.xs,
  color:        isFreeShip ? colors.success : colors.textSecondary,
  marginBottom: "0.5rem",
});

export const shippingBarTrackStyles = (
  colors: Colors,
  radius: Radius,
): CSSProperties => ({
  height:       4,
  borderRadius: radius?.full,
  background:   colors.borderLight,
  overflow:     "hidden",
});

export const shippingBarFillStyles = (
  colors: Colors,
  radius: Radius,
): CSSProperties => ({
  height:       "100%",
  background:   colors.accentPrimary,
  borderRadius: radius?.full,
});

// ── Items list ────────────────────────────────────────────────

export const itemsScrollAreaStyles: CSSProperties = {
  flex:      1,
  overflowY: "auto",
  padding:   "1rem 1.5rem",
};

export const itemRowWrapperStyles: CSSProperties = {
  marginBottom: "1rem",
  overflow:     "hidden",
};

export const itemCardStyles = (
  colors: Colors,
  radius: Radius,
): CSSProperties => ({
  display:     "flex",
  gap:         "0.875rem",
  alignItems:  "center",
  padding:     "0.875rem",
  background:  colors.bgSecondary,
  borderRadius: radius?.lg,
  border:      `1px solid ${colors.borderLight}`,
});

export const itemImageStyles = (
  radius: Radius,
): CSSProperties => ({
  width:          64,
  height:         64,
  borderRadius:   radius?.md,
  flexShrink:     0,
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
  fontSize:       "1.5rem",
  textDecoration: "none",
});

export const itemNameStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  fontFamily:   typography.fontBody,
  fontSize:     typography.sm,
  fontWeight:   typography.weightMedium,
  color:        colors.textPrimary,
  textDecoration: "none",
  display:      "block",
  whiteSpace:   "nowrap",
  overflow:     "hidden",
  textOverflow: "ellipsis",
});

export const itemPriceStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  fontFamily: typography.fontBody,
  fontSize:   typography.sm,
  color:      colors.accentPrimary,
  fontWeight: typography.weightBold,
  margin:     "2px 0 6px",
});

export const qtyControlsWrapperStyles = (
  colors: Colors,
  radius: Radius,
): CSSProperties => ({
  display:     "flex",
  alignItems:  "center",
  border:      `1px solid ${colors.borderLight}`,
  borderRadius: radius?.full,
  overflow:    "hidden",
  background:  colors.bgCard,
});

export const qtyButtonStyles = (colors: Colors): CSSProperties => ({
  width:          28,
  height:         28,
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
  width:      24,
  textAlign:  "center",
  fontFamily: typography.fontBody,
  fontSize:   typography.xs,
  color:      colors.textPrimary,
});

export const itemLineTotalStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  fontFamily:  typography.fontBody,
  fontSize:    typography.xs,
  color:       colors.textMuted,
  marginLeft:  4,
});

export const removeButtonStyles = (colors: Colors, radius: Radius): CSSProperties => ({
  flexShrink:     0,
  width:          28,
  height:         28,
  borderRadius:   radius?.full,
  background:     "transparent",
  border:         "none",
  cursor:         "pointer",
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
  color:          colors.textMuted,
});

// ── Empty state ───────────────────────────────────────────────

export const emptyStateWrapperStyles: CSSProperties = {
  display:        "flex",
  flexDirection:  "column",
  alignItems:     "center",
  justifyContent: "center",
  height:         "100%",
  gap:            "1rem",
};

export const emptyStatePrimaryTextStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  fontFamily:  typography.fontBody,
  fontSize:    typography.base,
  color:       colors.textPrimary,
  fontWeight:  typography.weightMedium,
  marginBottom: 4,
});

export const emptyStateSubTextStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  fontFamily: typography.fontBody,
  fontSize:   typography.sm,
  color:      colors.textMuted,
});

export const browseShopButtonStyles = (
  colors:     Colors,
  typography: Typography,
  radius:     Radius,
): CSSProperties => ({
  padding:    "0.7rem 1.75rem",
  borderRadius: radius?.full,
  background: colors.accentPrimary,
  color:      colors.textOnAccent,
  border:     "none",
  cursor:     "pointer",
  fontFamily: typography.fontBody,
  fontSize:   typography.sm,
  fontWeight: typography.weightMedium,
});

// ── Footer ────────────────────────────────────────────────────

export const footerWrapperStyles = (colors: Colors): CSSProperties => ({
  borderTop:  `1px solid ${colors.borderLight}`,
  padding:    "1.25rem 1.5rem",
  flexShrink: 0,
  background: colors.bgCard,
});

export const summaryRowStyles: CSSProperties = {
  display:        "flex",
  justifyContent: "space-between",
  marginBottom:   "0.5rem",
};

export const summaryLabelStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  fontFamily: typography.fontBody,
  fontSize:   typography.sm,
  color:      colors.textSecondary,
});

export const summaryValueStyles = (
  typography:  Typography,
  colors:      Colors,
  isFreeShip:  boolean,
): CSSProperties => ({
  fontFamily: typography.fontBody,
  fontSize:   typography.sm,
  color:      isFreeShip ? colors.success : colors.textPrimary,
});

export const footerActionsStyles: CSSProperties = {
  display:       "flex",
  flexDirection: "column",
  gap:           "0.625rem",
  marginTop:     "1rem",
};

export const checkoutButtonStyles = (
  colors:     Colors,
  typography: Typography,
  radius:     Radius,
  shadows:    Shadows,
): CSSProperties => ({
  width:          "100%",
  padding:        "0.875rem",
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

export const viewFullCartLinkStyles = (
  typography: Typography,
  colors:     Colors,
): CSSProperties => ({
  display:        "block",
  textAlign:      "center",
  fontFamily:     typography.fontBody,
  fontSize:       typography.sm,
  color:          colors.textMuted,
  textDecoration: "none",
  padding:        "0.5rem",
});