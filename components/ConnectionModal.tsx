import { View, Text, Pressable } from "react-native";
import { Star } from "lucide-react-native";
import { Colors } from "@/constants";
import type { UserProfile } from "@/types";

type ConnectionModalProps = {
  user: UserProfile;
  onDismiss: () => void;
};

export function ConnectionModal({ user, onDismiss }: ConnectionModalProps) {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <View
        style={{
          backgroundColor: Colors.surface.DEFAULT,
          borderRadius: 16,
          padding: 32,
          marginHorizontal: 32,
          alignItems: "center",
          maxWidth: 320,
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            backgroundColor: Colors.secondary.container,
          }}
        >
          <Star size={36} color={Colors.secondary.DEFAULT} fill={Colors.secondary.DEFAULT} />
        </View>
        <Text
          style={{
            fontFamily: "Manrope_800ExtraBold",
            fontSize: 22,
            color: Colors.onSurface.DEFAULT,
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          New Connection Found!
        </Text>
        <Text
          style={{
            fontFamily: "WorkSans_400Regular",
            fontSize: 15,
            lineHeight: 22,
            color: Colors.onSurface.variant,
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          You and {user.firstName} are now connected. Start a conversation!
        </Text>
        <Pressable
          onPress={onDismiss}
          style={{
            backgroundColor: Colors.primary.DEFAULT,
            paddingHorizontal: 32,
            paddingVertical: 12,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 15, color: Colors.onPrimary.DEFAULT }}>
            Continue
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
