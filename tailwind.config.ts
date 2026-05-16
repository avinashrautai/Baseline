import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#141414",
        surface: "#1C1C19",
        layer: "#272723",
        primary: "#76836A",
        accent: "#B89B72",
        foreground: "#F4EFE6",
        muted: "#9E968B",
        border: "#333330",
        "border-subtle": "#262623",
        danger: "#C45D4F",
        success: "#6B9E6B",
        warning: "#D4A853",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        "display": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.025em", fontWeight: "600" }],
        "heading-1": ["1.625rem", { lineHeight: "1.25", letterSpacing: "-0.02em", fontWeight: "600" }],
        "heading-2": ["1.375rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "500" }],
        "heading-3": ["1.125rem", { lineHeight: "1.35", letterSpacing: "-0.005em", fontWeight: "500" }],
        "body-lg": ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body": ["0.875rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["0.8125rem", { lineHeight: "1.5", fontWeight: "400" }],
        "caption": ["0.75rem", { lineHeight: "1.4", fontWeight: "400" }],
        "overline": ["0.6875rem", { lineHeight: "1.3", letterSpacing: "0.04em", fontWeight: "500" }],
      },
      borderRadius: {
        "sm": "0.375rem",
        "md": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        "subtle": "0 1px 2px rgba(0, 0, 0, 0.15)",
        "card": "0 1px 4px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08)",
        "elevated": "0 4px 16px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.1)",
        "modal": "0 12px 40px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.15s ease-out",
        "slide-up": "slideUp 0.25s ease-out",
        "slide-down": "slideDown 0.25s ease-out",
        "scale-in": "scaleIn 0.15s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.97)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
