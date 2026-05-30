import { type CSSProperties } from "react";
import type { Theme }         from "../../theme/themes";

export const getSpinnerWrapperStyles = (): CSSProperties => ({
  display:        "flex",
  alignItems:     "center",
  justifyContent: "center",
  minHeight:      "60vh",
});

export const getSpinnerDiscStyles = (colors: Theme["colors"]): CSSProperties => ({
  width:          34,
  height:         34,
  borderRadius:   "50%",
  border:         `3px solid ${colors.borderLight}`,
  borderTopColor: colors.accentPrimary,
  animation:      "spin 0.8s linear infinite",
});

export const SPIN_KEYFRAMES = `@keyframes spin { to { transform: rotate(360deg); } }`;