import { Pressable, Text, View } from "react-native";
import { X } from "lucide-react-native";
import { Colors } from "@/constants";

type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  onRemove?: () => void;
};

export function Chip({ label, selected = false, onPress, onRemove }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`
        flex-row items-center gap-2 px-4 py-2 rounded-full
        ${selected
          ? "bg-tertiary-container"
          : "bg-surface-container-high active:opacity-80"
        }
      `}
    >
      <Text
        className={`text-sm font-label ${
          selected ? "text-on-tertiary-container" : "text-on-surface-variant"
        }`}
      >
        {label}
      </Text>
      {selected && onRemove && (
        <Pressable onPress={onRemove} hitSlop={8}>
          <X size={14} color={Colors.onTertiary.container} />
        </Pressable>
      )}
    </Pressable>
  );
}
