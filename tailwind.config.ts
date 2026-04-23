import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.mdx",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", md: "2.5rem", lg: "5rem", xl: "7.5rem" },
      screens: { "2xl": "1440px" },
    },
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        border: "var(--border)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        cream: "var(--cream)",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        eyebrow: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.14em" }],
      },
      letterSpacing: {
        tightest: "-0.03em",
        tighter: "-0.02em",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
        inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "700": "700ms",
        "1200": "1200ms",
      },
      maxWidth: {
        prose: "40rem",
      },
    },
  },
  plugins: [],
};

export default config;
