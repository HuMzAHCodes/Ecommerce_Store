import type { Variants } from "framer-motion";

// ── Type Definitions ──────────────────────────────────────────────

export interface ThemeColors {
  bgPrimary: string;       bgSecondary: string;     bgTertiary: string;
  bgCard: string;          bgOverlay: string;
  accentPrimary: string;   accentSecondary: string;  accentHover: string;  accentLight: string;
  textPrimary: string;     textSecondary: string;    textMuted: string;
  textOnAccent: string;    textOnDark: string;
  borderLight: string;     borderMedium: string;     borderFocus: string;
  success: string;         successBg: string;
  error: string;           errorBg: string;
  warning: string;         warningBg: string;
  navBg: string;           navBorder: string;        navText: string;      navTextHover: string;
}

export interface ThemeTypography {
  fontDisplay: string;  fontBody: string;  fontMono: string;
  xs: string;   sm: string;   base: string;  lg: string;   xl: string;
  "2xl": string; "3xl": string; "4xl": string; "5xl": string; "6xl": string;
  weightLight: number;  weightRegular: number;  weightMedium: number;  weightBold: number;
}

export interface ThemeSpacing {
  xs: string; sm: string; md: string; lg: string;
  xl: string; "2xl": string; "3xl": string;
}

export interface ThemeRadius {
  sm: string; md: string; lg: string; xl: string; full: string;
}

export interface ThemeShadows {
  sm: string; md: string; lg: string; xl: string;
}

export interface ThemeTransitions {
  fast: string; normal: string; slow: string;
}

export interface ThemeAnimation {
  fadeUp: Variants;  fadeIn: Variants;  scaleIn: Variants;
  slideRight: Variants;  stagger: Variants;
}

export interface Theme {
  name: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing?: ThemeSpacing;
  radius?: ThemeRadius;
  shadows?: ThemeShadows;
  transitions?: ThemeTransitions;
  animation?: ThemeAnimation;
}

export type ThemeName = "blushAndSlate" | "midnightLuxe" | "frostAndCoral";

// ── Shared Tokens ─────────────────────────────────────────────────

const sharedSpacing: ThemeSpacing = {
  xs: "0.25rem", sm: "0.5rem", md: "1rem",
  lg: "1.5rem",  xl: "2rem",  "2xl": "3rem", "3xl": "4rem",
};

const sharedRadius: ThemeRadius = {
  sm: "4px", md: "8px", lg: "12px", xl: "16px", full: "9999px",
};

const sharedTransitions: ThemeTransitions = {
  fast: "0.15s ease", normal: "0.25s ease",
  slow: "0.4s cubic-bezier(0.4, 0, 0.2, 1)",
};

const sharedAnimation: ThemeAnimation = {
  fadeUp: {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  },
  fadeIn: {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  },
  scaleIn: {
    hidden:  { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
  },
  slideRight: {
    hidden:  { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  },
  stagger: {
    visible: { transition: { staggerChildren: 0.08 } },
  },
};

// ── Theme Definitions ─────────────────────────────────────────────

export const themes: Record<ThemeName, Theme> = {

  blushAndSlate: {
    name: "Blush & Slate",
    colors: {
      bgPrimary: "#FDF6F0",      bgSecondary: "#F9EDE3",    bgTertiary: "#F3E3D5",
      bgCard: "#FFFFFF",         bgOverlay: "rgba(61,74,92,0.45)",
      accentPrimary: "#C97B63",  accentSecondary: "#8EAFC2", accentHover: "#B56A52",
      accentLight: "#F5DDD0",
      textPrimary: "#3D4A5C",    textSecondary: "#6B7A8D",  textMuted: "#9AAABB",
      textOnAccent: "#FFFFFF",   textOnDark: "#FDF6F0",
      borderLight: "#ECDDD3",    borderMedium: "#D9C8BC",   borderFocus: "#C97B63",
      success: "#5A9E7A",        successBg: "#EBF5F0",
      error: "#C95A5A",          errorBg: "#F5EBEB",
      warning: "#C9A05A",        warningBg: "#F5F0EB",
      navBg: "#FDF6F0",          navBorder: "#ECDDD3",
      navText: "#3D4A5C",        navTextHover: "#C97B63",
    },
    typography: {
      fontDisplay: "'Cormorant Garamond', Georgia, serif",
      fontBody: "'DM Sans', system-ui, sans-serif",
      fontMono: "'DM Mono', monospace",
      xs: "0.75rem", sm: "0.875rem", base: "1rem", lg: "1.125rem", xl: "1.25rem",
      "2xl": "1.5rem", "3xl": "1.875rem", "4xl": "2.25rem", "5xl": "3rem", "6xl": "3.75rem",
      weightLight: 300, weightRegular: 400, weightMedium: 500, weightBold: 600,
    },
    spacing: sharedSpacing,
    radius: sharedRadius,
    shadows: {
      sm: "0 1px 3px rgba(61,74,92,0.08), 0 1px 2px rgba(61,74,92,0.04)",
      md: "0 4px 12px rgba(61,74,92,0.10), 0 2px 4px rgba(61,74,92,0.06)",
      lg: "0 12px 32px rgba(61,74,92,0.12), 0 4px 8px rgba(61,74,92,0.06)",
      xl: "0 24px 48px rgba(61,74,92,0.16), 0 8px 16px rgba(61,74,92,0.08)",
    },
    transitions: sharedTransitions,
    animation: sharedAnimation,
  },

  midnightLuxe: {
    name: "Midnight Luxe",
    colors: {
      bgPrimary: "#0A0A0F",      bgSecondary: "#1A1A2E",    bgTertiary: "#252540",
      bgCard: "#1A1A2E",         bgOverlay: "rgba(0,0,0,0.7)",
      accentPrimary: "#C9A84C",  accentSecondary: "#7B61FF", accentHover: "#B8972B",
      accentLight: "#2A2510",
      textPrimary: "#E8E8E8",    textSecondary: "#AAAAAA",  textMuted: "#666677",
      textOnAccent: "#0A0A0F",   textOnDark: "#E8E8E8",
      borderLight: "#2A2A3E",    borderMedium: "#3A3A55",   borderFocus: "#C9A84C",
      success: "#4A9E6A",        successBg: "#0A1A10",
      error: "#C95A5A",          errorBg: "#1A0A0A",
      warning: "#C9A84C",        warningBg: "#1A1500",
      navBg: "#0A0A0F",          navBorder: "#2A2A3E",
      navText: "#E8E8E8",        navTextHover: "#C9A84C",
    },
    typography: {
      fontDisplay: "'Playfair Display', Georgia, serif",
      fontBody: "'Outfit', system-ui, sans-serif",
      fontMono: "'JetBrains Mono', monospace",
      xs: "0.75rem", sm: "0.875rem", base: "1rem", lg: "1.125rem", xl: "1.25rem",
      "2xl": "1.5rem", "3xl": "1.875rem", "4xl": "2.25rem", "5xl": "3rem", "6xl": "3.75rem",
      weightLight: 300, weightRegular: 400, weightMedium: 500, weightBold: 600,
    },
    spacing: sharedSpacing, radius: sharedRadius,
    shadows: {
      sm: "0 1px 3px rgba(0,0,0,0.3)",  md: "0 4px 12px rgba(0,0,0,0.4)",
      lg: "0 12px 32px rgba(0,0,0,0.5)", xl: "0 24px 48px rgba(0,0,0,0.6)",
    },
    transitions: sharedTransitions,
    animation: sharedAnimation,
  },

  frostAndCoral: {
    name: "Frost & Coral",
    colors: {
      bgPrimary: "#F7F8FC",      bgSecondary: "#FFFFFF",    bgTertiary: "#EEF0F8",
      bgCard: "#FFFFFF",         bgOverlay: "rgba(26,26,46,0.45)",
      accentPrimary: "#FF6B6B",  accentSecondary: "#4ECDC4", accentHover: "#E85555",
      accentLight: "#FFE8E8",
      textPrimary: "#1A1A2E",    textSecondary: "#555577",  textMuted: "#9999BB",
      textOnAccent: "#FFFFFF",   textOnDark: "#F7F8FC",
      borderLight: "#E5E8F5",    borderMedium: "#CDD2E8",   borderFocus: "#FF6B6B",
      success: "#4ECDC4",        successBg: "#E8FAF9",
      error: "#FF6B6B",          errorBg: "#FFE8E8",
      warning: "#FFB347",        warningBg: "#FFF5E8",
      navBg: "#FFFFFF",          navBorder: "#E5E8F5",
      navText: "#1A1A2E",        navTextHover: "#FF6B6B",
    },
    typography: {
      fontDisplay: "'Syne', system-ui, sans-serif",
      fontBody: "'Nunito', system-ui, sans-serif",
      fontMono: "'Fira Code', monospace",
      xs: "0.75rem", sm: "0.875rem", base: "1rem", lg: "1.125rem", xl: "1.25rem",
      "2xl": "1.5rem", "3xl": "1.875rem", "4xl": "2.25rem", "5xl": "3rem", "6xl": "3.75rem",
      weightLight: 300, weightRegular: 400, weightMedium: 500, weightBold: 600,
    },
    spacing: sharedSpacing, radius: sharedRadius,
    shadows: {
      sm: "0 1px 3px rgba(26,26,46,0.08)", md: "0 4px 12px rgba(26,26,46,0.10)",
      lg: "0 12px 32px rgba(26,26,46,0.12)", xl: "0 24px 48px rgba(26,26,46,0.16)",
    },
    transitions: sharedTransitions,
    animation: sharedAnimation,
  },
};

export const activeTheme: Theme = themes.blushAndSlate;
export default themes;
