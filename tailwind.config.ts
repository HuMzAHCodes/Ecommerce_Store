import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // ── Colors — all read from CSS variables set by ThemeProvider ──
      colors: {
        bg: {
          primary:   "var(--color-bg-primary)",
          secondary: "var(--color-bg-secondary)",
          tertiary:  "var(--color-bg-tertiary)",
          card:      "var(--color-bg-card)",
        },
        accent: {
          primary:   "var(--color-accent-primary)",
          secondary: "var(--color-accent-secondary)",
          hover:     "var(--color-accent-hover)",
          light:     "var(--color-accent-light)",
        },
        text: {
          primary:   "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted:     "var(--color-text-muted)",
          onAccent:  "var(--color-text-on-accent)",
        },
        border: {
          light:  "var(--color-border-light)",
          medium: "var(--color-border-medium)",
          focus:  "var(--color-border-focus)",
        },
        nav: {
          bg:       "var(--color-nav-bg)",
          border:   "var(--color-nav-border)",
          text:     "var(--color-nav-text)",
          hover:    "var(--color-nav-text-hover)",
        },
        success: "var(--color-success)",
        error:   "var(--color-error)",
        warning: "var(--color-warning)",
      },

      // ── Typography — reads from ThemeProvider font variables ──
      fontFamily: {
        display: "var(--font-display)",
        body:    "var(--font-body)",
        mono:    "var(--font-mono)",
      },

      fontSize: {
        xs:   "var(--text-xs)",
        sm:   "var(--text-sm)",
        base: "var(--text-base)",
        lg:   "var(--text-lg)",
        xl:   "var(--text-xl)",
        "2xl":"var(--text-2xl)",
        "3xl":"var(--text-3xl)",
        "4xl":"var(--text-4xl)",
        "5xl":"var(--text-5xl)",
        "6xl":"var(--text-6xl)",
      },

      // ── Border radius ──────────────────────────────────────────
      borderRadius: {
        sm:   "var(--radius-sm)",
        md:   "var(--radius-md)",
        lg:   "var(--radius-lg)",
        xl:   "var(--radius-xl)",
        full: "var(--radius-full)",
      },

      // ── Box shadows ────────────────────────────────────────────
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
      },

      // ── Spacing ────────────────────────────────────────────────
      spacing: {
        xs:  "var(--spacing-xs)",
        sm:  "var(--spacing-sm)",
        md:  "var(--spacing-md)",
        lg:  "var(--spacing-lg)",
        xl:  "var(--spacing-xl)",
        "2xl":"var(--spacing-2xl)",
        "3xl":"var(--spacing-3xl)",
      },

      // ── Transitions ────────────────────────────────────────────
      transitionDuration: {
        fast:   "150ms",
        normal: "250ms",
        slow:   "400ms",
      },

      // ── Max width ──────────────────────────────────────────────
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
