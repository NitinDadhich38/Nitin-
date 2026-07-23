import type { Config } from "tailwindcss";

/**
 * PRAN Tailwind tokens — single source of truth for the design system.
 * Mirrors Docs/5_Design.md. Do not introduce colors/fonts not defined here.
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
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        pran: {
          ink: "#0a0a0a",
          teal: "#0f5f5c",
          "teal-dark": "#0a403e",
          paper: "#ffffff",
          text: "#0f1a1a",
          muted: "#5b6b6a",
          border: "#e2e8e7",
          navy: "#0a1f44",
          gold: "#c9a227",
          green: "#12a33a",
        },
        status: {
          success: "#1e7a46",
          pending: "#b7791f",
          danger: "#b42318",
          info: "#1f6fb2",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Fraunces", "ui-serif", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Design.md §3 type scale
        display: ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h1: ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        h2: ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.15" }],
        h3: ["1.25rem", { lineHeight: "1.3" }],
      },
      borderRadius: {
        btn: "var(--radius-btn)",
        card: "var(--radius-card)",
      },
      maxWidth: {
        content: "1280px",
      },
      keyframes: {
        "fade-rise": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-rise": "fade-rise 400ms ease-out both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
