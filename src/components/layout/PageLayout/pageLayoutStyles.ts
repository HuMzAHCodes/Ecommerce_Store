import type { CSSProperties } from "react";
import type { Theme }         from "../../../theme/themes";

type Colors = Theme["colors"];

export const pageWrapperStyles = (colors: Colors): CSSProperties => ({
  minHeight:     "100vh",
  display:       "flex",
  flexDirection: "column",
  background:    colors.bgPrimary,
});

export const pageMainStyles: CSSProperties = {
  flex: 1,
};

export const PAGE_TRANSITION = {
  initial:    { opacity: 0, y: 10 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
};