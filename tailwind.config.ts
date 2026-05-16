import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#111111",
        surface: "#181818",
        layer: "#232320",
        primary: "#7c8f6a",
        accent: "#B89B72",
        foreground: "#f1f1f1",
        muted: "#a1a1a1",
        border: "#2e2e2b",
        "border-subtle": "#1f1f1c",
        "sidebar": "#0d0d0d",
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
        "subtle": "0 1px 2px rgba(0, 0, 0, 0.1)",
        "card": "0 1px 3px rgba(0, 0, 0, 0.08)",
        "elevated": "0 4px 12px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.08)",
        "modal": "0 8px 32px rgba(0, 0, 0, 0.25), 0 2px 6px rgba(0, 0, 0, 0.12)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "fade-in": "fadeIn 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
        "slide-up": "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down": "slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scaleIn 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.98)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
