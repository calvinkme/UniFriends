import { TextStyle } from "react-native";

export const Typography = {
  display: {
    fontFamily: "Manrope_800ExtraBold",
    fontSize: 40,
    letterSpacing: -0.8,
    lineHeight: 48,
  },
  headlineLg: {
    fontFamily: "Manrope_800ExtraBold",
    fontSize: 32,
    letterSpacing: -0.64,
    lineHeight: 40,
  },
  headlineMd: {
    fontFamily: "Manrope_700Bold",
    fontSize: 28,
    letterSpacing: -0.28,
    lineHeight: 36,
  },
  headlineSm: {
    fontFamily: "Manrope_700Bold",
    fontSize: 24,
    letterSpacing: 0,
    lineHeight: 32,
  },
  titleLg: {
    fontFamily: "WorkSans_600SemiBold",
    fontSize: 22,
    letterSpacing: 0,
    lineHeight: 28,
  },
  titleMd: {
    fontFamily: "WorkSans_600SemiBold",
    fontSize: 16,
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  bodyLg: {
    fontFamily: "WorkSans_400Regular",
    fontSize: 16,
    letterSpacing: 0.5,
    lineHeight: 26,
  },
  bodyMd: {
    fontFamily: "WorkSans_400Regular",
    fontSize: 14,
    letterSpacing: 0.25,
    lineHeight: 23,
  },
  labelLg: {
    fontFamily: "WorkSans_500Medium",
    fontSize: 14,
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelMd: {
    fontFamily: "WorkSans_500Medium",
    fontSize: 12,
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  labelSm: {
    fontFamily: "WorkSans_600SemiBold",
    fontSize: 10,
    letterSpacing: 1.5,
    lineHeight: 14,
    textTransform: "uppercase",
  },
} as const satisfies Record<string, TextStyle>;
