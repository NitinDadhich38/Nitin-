import type { Config } from "tailwindcss";

/**
 * PRAN Tailwind tokens — single source of truth for the design system.
 * Mirrors Docs/5_Design.md v2.0. Do not introduce colors/fonts not defined here.
 *
 * Palette identity (v2.0): warm paper base, deep forest + emerald, restrained.
 * Legacy keys (teal/navy) are REPOINTED to the new palette so pages not yet
 * migrated inherit the new look; prefer the v2.0 names below for new work.
 */
const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        pran: {
          // ── Modern High-Contrast Enterprise Palette ────────────────────────
          paper: "#f8fafc", // crisp modern canvas (eliminates dead yellowish beige)
          "paper-warm": "#f1f5f9", // alternating section contrast
          surface: "#ffffff", // crisp floating cards
          ink: "#090d16", // deep midnight obsidian primary text
          text: "#090d16",
          muted: "#475569", // refined slate-600 secondary text
          border: "#e2e8f0", // clean slate-200 border
          hairline: "#e2e8f0",
          forest: "#0f3d2e",
          "forest-deep": "#0a2a20",
          emerald: "#16a34a",
          "emerald-hover": "#15803d",
          lime: "#d9f99d",
          clay: "#c97a4a",
          green: "#12a33a",
          // ── legacy aliases ─────────────────────────────────────────
          teal: "#16a34a",
          "teal-dark": "#15803d",
          "teal-lit": "#4ade80",
          navy: "#0f3d2e",
          gold: "#c9a227",
        },
        status: {
          success: "#059669",
          pending: "#d97706",
          danger: "#dc2626",
          info: "#2563eb",
        },
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Plus Jakarta Sans",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "SF Mono",
          "ui-monospace",
          "monospace",
        ],
      },
      letterSpacing: {
        "apple-tight": "-0.035em",
        "apple-headline": "-0.022em",
        "apple-body": "-0.011em",
        "apple-badge": "0.05em",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      fontSize: {
        // 5_Design.md v2.0 §2.2 scale
        // min 2.5rem so Display XL caps on mobile per §7; grows to 5.5rem
        "display-xl": ["clamp(2.5rem, 7vw, 5.5rem)", { lineHeight: "1.04", letterSpacing: "-0.035em" }],
        "display-l": ["clamp(2.25rem, 5vw, 3.75rem)", { lineHeight: "1.07", letterSpacing: "-0.03em" }],
        // legacy tokens kept for un-migrated pages
        display: ["clamp(2.5rem, 7vw, 5.5rem)", { lineHeight: "1.04", letterSpacing: "-0.035em" }],
        h1: ["clamp(2.25rem, 5vw, 3.75rem)", { lineHeight: "1.07", letterSpacing: "-0.03em" }],
        h2: ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        h3: ["1.375rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        btn: "12px",
        card: "18px",
        panel: "24px",
        hero: "32px",
        squircle: "22px",
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        // Multi-layer ambient diffused shadows (Apple Human Interface principle)
        card: "0 1px 2px rgba(0, 0, 0, 0.03), 0 4px 12px rgba(6, 26, 20, 0.04), 0 12px 24px -4px rgba(6, 26, 20, 0.05)",
        float:
          "0 2px 4px rgba(0, 0, 0, 0.02), 0 8px 24px rgba(6, 26, 20, 0.06), 0 24px 44px -8px rgba(6, 26, 20, 0.08)",
        lift: "0 2px 4px rgba(10,42,32,.04), 0 18px 32px rgba(10,42,32,.08), 0 32px 60px rgba(10,42,32,.10)",
        "apple-card": "0 1px 2px rgba(0, 0, 0, 0.03), 0 4px 12px rgba(6, 26, 20, 0.04), 0 12px 24px -4px rgba(6, 26, 20, 0.05)",
        "apple-hover": "0 2px 4px rgba(0, 0, 0, 0.02), 0 8px 24px rgba(6, 26, 20, 0.06), 0 24px 40px -8px rgba(6, 26, 20, 0.08)",
        "apple-glass": "0 8px 32px 0 rgba(0, 0, 0, 0.04), 0 1px 1px 0 rgba(255, 255, 255, 0.6) inset",
      },
      keyframes: {
        "fade-rise": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-rise": "fade-rise 500ms cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
