/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#fcf9f4",
        surface: {
          DEFAULT: "#fcf9f4",
          dim: "#dcdad5",
          bright: "#fcf9f4",
          tint: "#7b563e",
          variant: "#e5e2dd",
          "container-lowest": "#ffffff",
          "container-low": "#f6f3ee",
          container: "#f0ede9",
          "container-high": "#ebe8e3",
          "container-highest": "#e5e2dd",
        },
        primary: {
          DEFAULT: "#7b563e",
          container: "#cc9e82",
          fixed: "#ffdbc7",
          "fixed-dim": "#edbc9f",
        },
        "on-primary": {
          DEFAULT: "#ffffff",
          container: "#563520",
          fixed: "#2e1503",
          "fixed-variant": "#613f29",
        },
        secondary: {
          DEFAULT: "#546253",
          container: "#d5e4d1",
          fixed: "#d8e7d4",
          "fixed-dim": "#bccbb8",
        },
        "on-secondary": {
          DEFAULT: "#ffffff",
          container: "#586657",
          fixed: "#121e13",
          "fixed-variant": "#3d4a3c",
        },
        tertiary: {
          DEFAULT: "#665e43",
          container: "#b2a788",
          fixed: "#eee2c0",
          "fixed-dim": "#d1c6a5",
        },
        "on-tertiary": {
          DEFAULT: "#ffffff",
          container: "#443c24",
          fixed: "#211b07",
          "fixed-variant": "#4e462e",
        },
        error: {
          DEFAULT: "#ba1a1a",
          container: "#ffdad6",
        },
        "on-error": {
          DEFAULT: "#ffffff",
          container: "#93000a",
        },
        "on-background": "#1c1c19",
        "on-surface": {
          DEFAULT: "#1c1c19",
          variant: "#50443e",
        },
        outline: {
          DEFAULT: "#82746d",
          variant: "#d4c3ba",
        },
        inverse: {
          surface: "#31302d",
          "on-surface": "#f3f0eb",
          primary: "#edbc9f",
        },
      },
      fontFamily: {
        headline: ["Manrope_700Bold", "Manrope_800ExtraBold", "System"],
        "headline-regular": ["Manrope_400Regular", "System"],
        body: ["WorkSans_400Regular", "System"],
        "body-medium": ["WorkSans_500Medium", "System"],
        "body-semibold": ["WorkSans_600SemiBold", "System"],
        label: ["WorkSans_500Medium", "System"],
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
        full: "9999px",
      },
      spacing: {
        "4.5": "18px",
      },
    },
  },
  plugins: [],
};
