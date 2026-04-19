import { Pressable, Text, View, StyleSheet } from "react-native";
import type { ReactNode } from "react";
import { Colors } from "@/constants";

type ButtonVariant = "primary" | "secondary" | "surface";

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
};

const variantStyles: Record<ButtonVariant, { bg: string; text: string }> = {
  primary: {
    bg: Colors.primary.DEFAULT,
    text: Colors.onPrimary.DEFAULT,
  },
  secondary: {
    bg: Colors.secondary.DEFAULT,
    text: Colors.onSecondary.DEFAULT,
  },
  surface: {
    bg: Colors.surface.containerHigh,
    text: Colors.onSurface.variant,
  },
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export function Button({ label, onPress, variant = "primary", icon, fullWidth = false, disabled = false }: ButtonProps) {
  const variantStyle = variantStyles[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        { backgroundColor: variantStyle.bg, width: fullWidth ? "100%" : "auto", opacity: disabled ? 0.5 : 1 },
      ]}
    >
      {icon && <View>{icon}</View>}
      <Text style={[styles.text, { color: variantStyle.text }]}>{label}</Text>
    </Pressable>
  );
}
