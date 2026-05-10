import { View } from "react-native";
import { Check } from "lucide-react-native";
import { Colors } from "@/constants";
import type { MessageStatus as Status } from "@/types";

type Props = {
  status: Status;
  size?: number;
};

export function MessageStatus({ status, size = 14 }: Props) {
  if (status === "sending") {
    return (
      <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            width: size * 0.5,
            height: size * 0.5,
            borderRadius: size * 0.25,
            borderWidth: 1.5,
            borderColor: Colors.outline.DEFAULT,
            borderTopColor: "transparent",
          }}
        />
      </View>
    );
  }

  if (status === "sent") {
    return (
      <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
        <Check size={size * 0.85} color={Colors.outline.DEFAULT} strokeWidth={2.5} />
      </View>
    );
  }

  if (status === "delivered") {
    return (
      <View style={{ flexDirection: "row", width: size * 1.4, height: size, alignItems: "center" }}>
        <Check size={size * 0.85} color={Colors.outline.DEFAULT} strokeWidth={2.5} />
        <View style={{ marginLeft: -size * 0.45 }}>
          <Check size={size * 0.85} color={Colors.outline.DEFAULT} strokeWidth={2.5} />
        </View>
      </View>
    );
  }

  // status === "read"
  return (
    <View style={{ flexDirection: "row", width: size * 1.4, height: size, alignItems: "center" }}>
      <Check size={size * 0.85} color={Colors.secondary.DEFAULT} strokeWidth={2.5} />
      <View style={{ marginLeft: -size * 0.45 }}>
        <Check size={size * 0.85} color={Colors.secondary.DEFAULT} strokeWidth={2.5} />
      </View>
    </View>
  );
}
