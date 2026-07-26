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
          // ── v2.0 core ──────────────────────────────────────────────
          paper: "#faf8f4", // primary page background (warm, never #fff)
          "paper-warm": "#f5f1ea", // alternating section background
          surface: "#ffffff", // cards floating on paper
          ink: "#0e1211", // primary text (near-black, not pure black)
          text: "#0e1211",
          muted: "#5f6b66", // secondary text
          border: "#e6e1d8", // hairline
          hairline: "#e6e1d8",
          forest: "#0f3d2e", // deep forest — dark sections, footer
          "forest-deep": "#0a2a20", // darker layer / hover
          emerald: "#16a34a", // primary action
          "emerald-hover": "#15803d",
          lime: "#d9f99d", // rare highlight
          clay: "#c97a4a", // warm data accent
          green: "#12a33a", // brand logo emblem (fixed)
          // ── legacy aliases (repointed to v2.0) ─────────────────────
          teal: "#16a34a",
          "teal-dark": "#15803d",
          "teal-lit": "#4ade80",
          navy: "#0f3d2e",
          gold: "#c9a227",
        },
        status: {
          success: "#15803d",
          pending: "#b45309",
          danger: "#b42318",
          info: "#1d4ed8",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Space Grotesk", "ui-sans-serif", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
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
        card: "16px",
        panel: "24px",
        hero: "32px",
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        // Brand-tinted, multi-layer shadows (tinted with forest 10,42,32, never
        // flat gray) — the premium "float" register borrowed from Polariyon.
        card: "0 0.6px 1.4px rgba(10,42,32,.04), 0 2.3px 5.3px rgba(10,42,32,.05), 0 10px 24px rgba(10,42,32,.06)",
        float:
          "0 0.8px 1.4px rgba(10,42,32,.05), 0 1.9px 3.5px rgba(10,42,32,.05), 0 3.9px 7px rgba(10,42,32,.05), 0 7.3px 13px rgba(10,42,32,.05), 0 14.6px 26px rgba(10,42,32,.06), 0 32px 58px rgba(10,42,32,.08)",
        lift: "0 2px 4px rgba(10,42,32,.06), 0 18px 32px rgba(10,42,32,.10), 0 32px 60px rgba(10,42,32,.12)",
      },
      keyframes: {
        "fade-rise": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-rise": "fade-rise 500ms ease-out both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
