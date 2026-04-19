export const Colors = {
  background: "#fcf9f4",
  surface: {
    DEFAULT: "#fcf9f4",
    dim: "#dcdad5",
    bright: "#fcf9f4",
    tint: "#7b563e",
    variant: "#e5e2dd",
    containerLowest: "#ffffff",
    containerLow: "#f6f3ee",
    container: "#f0ede9",
    containerHigh: "#ebe8e3",
    containerHighest: "#e5e2dd",
  },
  primary: {
    DEFAULT: "#7b563e",
    container: "#cc9e82",
    fixed: "#ffdbc7",
    fixedDim: "#edbc9f",
  },
  onPrimary: {
    DEFAULT: "#ffffff",
    container: "#563520",
  },
  secondary: {
    DEFAULT: "#546253",
    container: "#d5e4d1",
  },
  onSecondary: {
    DEFAULT: "#ffffff",
    container: "#586657",
  },
  tertiary: {
    DEFAULT: "#665e43",
    container: "#b2a788",
  },
  onTertiary: {
    DEFAULT: "#ffffff",
    container: "#443c24",
  },
  error: {
    DEFAULT: "#ba1a1a",
    container: "#ffdad6",
  },
  onError: {
    DEFAULT: "#ffffff",
    container: "#93000a",
  },
  onBackground: "#1c1c19",
  onSurface: {
    DEFAULT: "#1c1c19",
    variant: "#50443e",
  },
  outline: {
    DEFAULT: "#82746d",
    variant: "#d4c3ba",
  },
  inverse: {
    surface: "#31302d",
    onSurface: "#f3f0eb",
    primary: "#edbc9f",
  },
} as const;
