import { View, Text } from "react-native";

type BadgeProps = {
  label: string;
};

export function Badge({ label }: BadgeProps) {
  return (
    <View className="px-2 py-0.5 rounded bg-secondary-container">
      <Text
        className="text-on-secondary-container font-label"
        style={{ fontSize: 10, fontFamily: "WorkSans_600SemiBold", letterSpacing: 1, textTransform: "uppercase" }}
      >
        {label}
      </Text>
    </View>
  );
}
