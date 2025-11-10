/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
      extend: {
        colors: {
          // Brand
          "brand-primary": "#7B5CFF",
          "brand-secondary": "#F68E5F",
  
          // Backgrounds
          "bg-base": "#0D0D0F",
          "bg-card": "#18181B",
          "bg-muted": "#1F1F23",
          "bg-border": "#2E2E2E",
  
          // Text
          "text-primary": "#EDEDED",
          "text-secondary": "#9A9A9A",
        },
        borderRadius: {
          xl: "14px",
          "2xl": "18px",
        },
        boxShadow: {
          soft: "0 6px 24px rgba(0,0,0,0.25)",
        },
      },
    },
    plugins: [],
  }
  