import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Sora"', "Inter", "system-ui", "sans-serif"],
        sans: ['"DM Sans"', "Inter", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        teal: "rgb(var(--teal) / <alpha-value>)",
      },
      boxShadow: {
        lift: "0 18px 45px rgba(0,0,0,.22)",
        glow: "0 0 22px rgba(108,99,255,.28)",
      },
    },
  },
  plugins: [],
};

export default config;
