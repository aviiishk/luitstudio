import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body:    ["var(--font-body)",    "Space Grotesk", "sans-serif"],
        heading: ["var(--font-heading)", "Archivo",       "sans-serif"],
        display: ["var(--font-display)", "UnifrakturCook","cursive"],
      },
      colors: {
        primary:   "#EC4899",
        secondary: "#F472B6",
        cta:       "#06B6D4",
        brand: {
          bg:   "#FDF2F8",
          text: "#831843",
          muted:"#be185d",
        },
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(90deg, #EC4899, #06B6D4)",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
