import { View } from "react-native";
import type { ReactNode } from "react";

type CardVariant = "surface" | "surface-low" | "surface-container";

type CardProps = {
  children: ReactNode;
  variant?: CardVariant;
  ghostBorder?: boolean;
  className?: string;
};

const variantClasses: Record<CardVariant, string> = {
  surface: "bg-surface",
  "surface-low": "bg-surface-container-low",
  "surface-container": "bg-surface-container",
};

export function Card({ children, variant = "surface-low", ghostBorder = false, className = "" }: CardProps) {
  return (
    <View
      className={`
        rounded-xl p-6
        ${variantClasses[variant]}
        ${ghostBorder ? "border border-outline-variant/15" : ""}
        ${className}
      `}
    >
      {children}
    </View>
  );
}
