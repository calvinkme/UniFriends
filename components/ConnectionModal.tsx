import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useEffect } from "react";
import { Star, Send } from "lucide-react-native";
import { Colors } from "@/constants";
import { Avatar } from "@/components/ui/Avatar";
import type { UserProfile } from "@/types";

type ConnectionModalProps = {
  visible: boolean;
  user: UserProfile;
  mode: "sent" | "matched";
  onChat?: () => void;
  onClose: () => void;
};

export function ConnectionModal({ visible, user, mode, onChat, onClose }: ConnectionModalProps) {
  useEffect(() => {
    if (visible && mode === "sent") {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [visible, mode]);

  if (mode === "sent") {
    return (
      <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.35)",
          }}
        >
          <View
            style={{
              backgroundColor: Colors.surface.DEFAULT,
              borderRadius: 20,
              paddingVertical: 28,
              paddingHorizontal: 36,
              alignItems: "center",
              width: 280,
            }}
          >
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
                backgroundColor: Colors.primary.container,
              }}
            >
              <Send size={24} color={Colors.primary.DEFAULT} />
            </View>
            <Text
              style={{
                fontFamily: "Manrope_800ExtraBold",
                fontSize: 20,
                color: Colors.onSurface.DEFAULT,
                textAlign: "center",
                marginBottom: 6,
              }}
            >
              Connection Sent!
            </Text>
            <Text
              style={{
                fontFamily: "WorkSans_400Regular",
                fontSize: 14,
                lineHeight: 20,
                color: Colors.onSurface.variant,
                textAlign: "center",
              }}
            >
              {user.firstName} will be notified
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <TouchableOpacity activeOpacity={1} onPress={() => {}}>
          <View
            style={{
              backgroundColor: Colors.surface.DEFAULT,
              borderRadius: 24,
              padding: 32,
              alignItems: "center",
              width: 320,
            }}
          >
            <View
              style={{
                width: 88,
                height: 88,
                borderRadius: 44,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 8,
                backgroundColor: Colors.secondary.container,
              }}
            >
              <Avatar
                uri={user.avatarUrl}
                name={`${user.firstName} ${user.lastName}`}
                size="lg"
              />
            </View>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Colors.primary.container,
                marginTop: -24,
                marginBottom: 16,
              }}
            >
              <Star size={16} color={Colors.primary.DEFAULT} fill={Colors.primary.DEFAULT} />
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
              You're Connected!
            </Text>
            <Text
              style={{
                fontFamily: "WorkSans_400Regular",
                fontSize: 15,
                lineHeight: 22,
                color: Colors.onSurface.variant,
                textAlign: "center",
                marginBottom: 28,
              }}
            >
              You and {user.firstName} are now friends. Say hello!
            </Text>
            <View style={{ width: "100%", gap: 10 }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onChat}
                style={{
                  backgroundColor: Colors.primary.DEFAULT,
                  paddingVertical: 14,
                  borderRadius: 14,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 15, color: Colors.onPrimary.DEFAULT }}>
                  Send a Message
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onClose}
                style={{
                  backgroundColor: Colors.surface.containerHigh,
                  paddingVertical: 14,
                  borderRadius: 14,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 15, color: Colors.onSurface.variant }}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
