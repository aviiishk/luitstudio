import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // IMPORTANT for future UI
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "deep-blue": "#1D4ED8",
        "bright-blue": "#3B82F6",
        "vibrant-pink": "#EC4899",
        "light-pink": "#F9A8D4",

        // 🔥 ADD THESE (pro palette)
        "glass-white": "rgba(255,255,255,0.05)",
        "border-soft": "rgba(255,255,255,0.1)",
      },

      backgroundImage: {
        "gradient-primary":
          "linear-gradient(90deg, #3B82F6, #EC4899)",
      },

      // 🔥 ADD THIS (for smooth UI feel)
      backdropBlur: {
        xs: "2px",
      },

      // 🔥 ADD ANIMATIONS (lightweight, no lib needed)
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
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