export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        backgroundMain: "#F7F5F0",
        backgroundAlt: "#EFECE6",
        cardSurface: "#FFFFFF",
        textPrimary: "#1F1E1C",
        textSecondary: "#6B6A66",
        textMuted: "#9A9893",
        accentSand: "#C2A36B",
        darkBackgroundMain: "#2B2B28",
        darkBackgroundAlt: "#3A3A36",
        darkCardSurface: "#4A4A45",
        darkTextPrimary: "#EFECE6",
        darkTextSecondary: "#C2A36B",
        darkTextMuted: "#9A9893",
        darkAccentSand: "#E4D6B0",
      },
      borderRadius: {
        DEFAULT: "12px",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.08)",
        "soft-lg": "0 4px 16px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};
