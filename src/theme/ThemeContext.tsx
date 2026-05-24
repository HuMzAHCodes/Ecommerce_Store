import { createContext, useContext } from "react";
import type { Theme } from "./themes";

export const ThemeContext = createContext<Theme | null>(null);

export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside <ThemeProvider>");
  return context;
};
