import { useEffect, type ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";
import { themes } from "./themes";
import type { ThemeName } from "./themes";

interface ThemeProviderProps {
  theme?: ThemeName;
  children: ReactNode;
}

const ThemeProvider = ({ theme: themeName = "blushAndSlate", children }: ThemeProviderProps) => {
  const theme = themes[themeName] ?? themes.blushAndSlate;

  useEffect(() => {
    const root = document.documentElement;
    const { colors, typography, spacing, radius, shadows, transitions } = theme;

    // ── Colors → CSS variables ────────────────────────────────
    (Object.entries(colors) as [string, string][]).forEach(([key, val]) => {
      root.style.setProperty("--color-" + key.replace(/([A-Z])/g, "-$1").toLowerCase(), val);
    });

    // ── Fonts → CSS variables ─────────────────────────────────
    root.style.setProperty("--font-display", typography.fontDisplay);
    root.style.setProperty("--font-body",    typography.fontBody);
    root.style.setProperty("--font-mono",    typography.fontMono);

    // ── Font size scale → CSS variables ───────────────────────
    const sizes = ["xs","sm","base","lg","xl","2xl","3xl","4xl","5xl","6xl"] as const;
    sizes.forEach((s) => root.style.setProperty(`--text-${s}`, typography[s]));

    // ── Font weight → CSS variables ───────────────────────────
    root.style.setProperty("--weight-light",   String(typography.weightLight));
    root.style.setProperty("--weight-regular", String(typography.weightRegular));
    root.style.setProperty("--weight-medium",  String(typography.weightMedium));
    root.style.setProperty("--weight-bold",    String(typography.weightBold));

    // ── Spacing, radius, shadows, transitions ─────────────────
    if (spacing)     Object.entries(spacing).forEach(([k,v])     => root.style.setProperty(`--spacing-${k}`, v));
    if (radius)      Object.entries(radius).forEach(([k,v])      => root.style.setProperty(`--radius-${k}`, v));
    if (shadows)     Object.entries(shadows).forEach(([k,v])     => root.style.setProperty(`--shadow-${k}`, v));
    if (transitions) Object.entries(transitions).forEach(([k,v]) => root.style.setProperty(`--transition-${k}`, v));

    // ── Body base ─────────────────────────────────────────────
    document.body.style.backgroundColor = colors.bgPrimary;
    document.body.style.color           = colors.textPrimary;
    document.body.style.fontFamily      = typography.fontBody;

    // ── Google Fonts ──────────────────────────────────────────
    injectGoogleFonts(typography.fontDisplay, typography.fontBody);

  }, [theme]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

// ── Google Fonts Loader ───────────────────────────────────────
// Loads correct weights per font family for cosmetics store typography

const FONT_CONFIG: Record<string, string> = {
  // Playfair Display — needs italic + all weights for editorial headings
  "Playfair Display":
    "family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700",

  // DM Sans — needs light through bold for body + UI labels
  "DM Sans":
    "family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400",

  // DM Mono — for code/prices if needed
  "DM Mono":
    "family=DM+Mono:wght@300;400;500",

  // Cormorant Garamond fallback
  "Cormorant Garamond":
    "family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600",

  // Other theme fonts
  "Outfit":
    "family=Outfit:wght@300;400;500;600;700",
  "Syne":
    "family=Syne:wght@400;500;600;700;800",
  "Nunito":
    "family=Nunito:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400",
};

const injectGoogleFonts = (...stacks: string[]): void => {
  document.getElementById("theme-fonts")?.remove();

  const extract = (s: string) => s.match(/^'([^']+)'/)?.[1] ?? null;
  const fontNames = stacks.map(extract).filter((f): f is string => f !== null);

  const families = fontNames
    .map((name) => FONT_CONFIG[name] ?? `family=${name.replace(/ /g, "+")}:wght@300;400;500;600;700`)
    .join("&");

  const link = Object.assign(document.createElement("link"), {
    id:   "theme-fonts",
    rel:  "stylesheet",
    href: `https://fonts.googleapis.com/css2?${families}&display=swap`,
  });

  // Preconnect for faster load
  const preconnect = Object.assign(document.createElement("link"), {
    id:   "theme-fonts-preconnect",
    rel:  "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  });

  document.getElementById("theme-fonts-preconnect")?.remove();
  document.head.appendChild(preconnect);
  document.head.appendChild(link);
};

export default ThemeProvider;





// import { useEffect, type ReactNode } from "react";
// import { ThemeContext } from "./ThemeContext";
// import { themes } from "./themes";
// import type { ThemeName } from "./themes";

// interface ThemeProviderProps {
//   theme?: ThemeName;
//   children: ReactNode;
// }

// const ThemeProvider = ({ theme: themeName = "twilightSand", children }: ThemeProviderProps) => {
//   const theme = themes[themeName] ?? themes.twilightSand;

//   useEffect(() => {
//     const root = document.documentElement;
//     const { colors, typography, spacing, radius, shadows, transitions } = theme;

//     (Object.entries(colors) as [string, string][]).forEach(([key, val]) => {
//       root.style.setProperty("--color-" + key.replace(/([A-Z])/g, "-$1").toLowerCase(), val);
//     });

//     root.style.setProperty("--font-display", typography.fontDisplay);
//     root.style.setProperty("--font-body",    typography.fontBody);
//     root.style.setProperty("--font-mono",    typography.fontMono);

//     if (spacing)     Object.entries(spacing).forEach(([k, v])     => root.style.setProperty(`--spacing-${k}`, v));
//     if (radius)      Object.entries(radius).forEach(([k, v])      => root.style.setProperty(`--radius-${k}`, v));
//     if (shadows)     Object.entries(shadows).forEach(([k, v])     => root.style.setProperty(`--shadow-${k}`, v));
//     if (transitions) Object.entries(transitions).forEach(([k, v]) => root.style.setProperty(`--transition-${k}`, v));

//     document.body.style.backgroundColor = colors.bgPrimary;
//     document.body.style.color           = colors.textPrimary;
//     document.body.style.fontFamily      = typography.fontBody;

//     injectGoogleFonts(typography.fontDisplay, typography.fontBody, typography.fontMono);
//   }, [theme]);

//   return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
// };

// const injectGoogleFonts = (...stacks: string[]): void => {
//   document.getElementById("theme-fonts")?.remove();
//   const extract = (s: string) => s.match(/^'([^']+)'/)?.[1] ?? null;
//   const fonts = stacks.map(extract).filter((f): f is string => f !== null);
//   const families = fonts.map(f => {
//     const enc = f.replace(/ /g, "+");
//     return (f.includes("Cormorant") || f.includes("Playfair"))
//       ? `family=${enc}:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400`
//       : `family=${enc}:wght@300;400;500;600`;
//   }).join("&");
//   const link = Object.assign(document.createElement("link"), {
//     id: "theme-fonts", rel: "stylesheet",
//     href: `https://fonts.googleapis.com/css2?${families}&display=swap`,
//   });
//   document.head.appendChild(link);
// };

// export default ThemeProvider;
