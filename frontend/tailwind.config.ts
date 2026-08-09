import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        graphite: "#121316",
        raised: "#1A1B1F",
        ink: "#ECEDEF",
        "ink-muted": "#9A9CA3",
        signal: "#FFC53D",
        "signal-deep": "#E0A82E",
        line: "rgba(236,237,239,0.12)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(180deg, rgba(255,197,61,0) 0%, rgba(18,19,22,1) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
