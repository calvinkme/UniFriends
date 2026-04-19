import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants";

type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  segment: {
    flex: 1,
    height: 4,
    borderRadius: 999,
  },
});

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }, (_, i) => (
        <View
          key={i}
          style={[
            styles.segment,
            {
              backgroundColor:
                i < currentStep ? Colors.primary.DEFAULT : Colors.surface.containerHigh,
            },
          ]}
        />
      ))}
    </View>
  );
}
