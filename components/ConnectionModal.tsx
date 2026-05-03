import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Star } from "lucide-react-native";
import { Colors } from "@/constants";
import { Avatar } from "@/components/ui/Avatar";
import type { UserProfile } from "@/types";

type ConnectionModalProps = {
  visible: boolean;
  user: UserProfile;
  onChat: () => void;
  onClose: () => void;
};

export function ConnectionModal({ visible, user, onChat, onClose }: ConnectionModalProps) {
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
