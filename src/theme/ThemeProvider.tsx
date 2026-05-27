// import { useEffect, type ReactNode } from "react";
// import { ThemeContext } from "./ThemeContext";
// import { themes } from "./themes";
// import type { ThemeName } from "./themes";

// interface ThemeProviderProps {
//   theme?: ThemeName;
//   children: ReactNode;
// }

// const ThemeProvider = ({ theme: themeName = "blushAndSlate", children }: ThemeProviderProps) => {
//   const theme = themes[themeName] ?? themes.blushAndSlate;

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
import { useEffect, type ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";
import { themes } from "./themes";
import type { ThemeName } from "./themes";

interface ThemeProviderProps {
  theme?: ThemeName;
  children: ReactNode;
}

const ThemeProvider = ({ theme: themeName = "twilightSand", children }: ThemeProviderProps) => {
  const theme = themes[themeName] ?? themes.twilightSand;

  useEffect(() => {
    const root = document.documentElement;
    const { colors, typography, spacing, radius, shadows, transitions } = theme;

    (Object.entries(colors) as [string, string][]).forEach(([key, val]) => {
      root.style.setProperty("--color-" + key.replace(/([A-Z])/g, "-$1").toLowerCase(), val);
    });

    root.style.setProperty("--font-display", typography.fontDisplay);
    root.style.setProperty("--font-body",    typography.fontBody);
    root.style.setProperty("--font-mono",    typography.fontMono);

    if (spacing)     Object.entries(spacing).forEach(([k, v])     => root.style.setProperty(`--spacing-${k}`, v));
    if (radius)      Object.entries(radius).forEach(([k, v])      => root.style.setProperty(`--radius-${k}`, v));
    if (shadows)     Object.entries(shadows).forEach(([k, v])     => root.style.setProperty(`--shadow-${k}`, v));
    if (transitions) Object.entries(transitions).forEach(([k, v]) => root.style.setProperty(`--transition-${k}`, v));

    document.body.style.backgroundColor = colors.bgPrimary;
    document.body.style.color           = colors.textPrimary;
    document.body.style.fontFamily      = typography.fontBody;

    injectGoogleFonts(typography.fontDisplay, typography.fontBody, typography.fontMono);
  }, [theme]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

const injectGoogleFonts = (...stacks: string[]): void => {
  document.getElementById("theme-fonts")?.remove();
  const extract = (s: string) => s.match(/^'([^']+)'/)?.[1] ?? null;
  const fonts = stacks.map(extract).filter((f): f is string => f !== null);
  const families = fonts.map(f => {
    const enc = f.replace(/ /g, "+");
    return (f.includes("Cormorant") || f.includes("Playfair"))
      ? `family=${enc}:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400`
      : `family=${enc}:wght@300;400;500;600`;
  }).join("&");
  const link = Object.assign(document.createElement("link"), {
    id: "theme-fonts", rel: "stylesheet",
    href: `https://fonts.googleapis.com/css2?${families}&display=swap`,
  });
  document.head.appendChild(link);
};

export default ThemeProvider;
