import { View, Text, Pressable, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Colors } from "@/constants";
import { Avatar } from "@/components/ui/Avatar";
import { useConnectionStore } from "@/stores";
import type { Connection } from "@/types";

export default function MessagesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { connections, loadConnections } = useConnectionStore();

  useEffect(() => {
    loadConnections();
  }, []);

  // Show connections that have messages
  const activeConversations = connections.filter((c) => c.lastMessage);

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="px-6 h-16 justify-center">
        <Text
          className="text-on-surface"
          style={{ fontFamily: "Manrope_800ExtraBold", fontSize: 24, letterSpacing: -0.5 }}
        >
          Messages
        </Text>
      </View>

      {activeConversations.length > 0 ? (
        <FlatList<Connection>
          data={activeConversations}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 24 }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item: conn }) => (
            <Pressable
              onPress={() => router.push(`/chat/${conn.user.id}`)}
              className="flex-row items-center gap-4 p-4 rounded-lg bg-surface active:scale-[0.98]"
              style={{
                borderWidth: 1,
                borderColor: Colors.outline.variant + "4D",
              }}
            >
              <Avatar
                uri={conn.user.avatarUrl}
                name={`${conn.user.firstName} ${conn.user.lastName}`}
                size="md"
                showOnline
                isOnline={conn.user.isOnline}
              />
              <View className="flex-1 min-w-0">
                <View className="flex-row items-center gap-2 mb-0.5">
                  <Text
                    style={{ fontFamily: "Manrope_700Bold", fontSize: 15, color: Colors.onSurface.DEFAULT }}
                    numberOfLines={1}
                  >
                    {conn.user.firstName} {conn.user.lastName}
                  </Text>
                </View>
                <Text
                  style={{ fontFamily: "WorkSans_400Regular", fontSize: 14, color: Colors.onSurface.variant }}
                  numberOfLines={1}
                >
                  {conn.lastMessage}
                </Text>
              </View>
              <View className="items-end">
                <Text
                  style={{
                    fontFamily: "WorkSans_600SemiBold", fontSize: 10,
                    color: Colors.onSurface.variant + "99", marginBottom: 4,
                  }}
                >
                  {conn.lastMessageTime}
                </Text>
                {conn.unread && (
                  <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.primary.container }} />
                )}
              </View>
            </Pressable>
          )}
          ListFooterComponent={<View style={{ height: 100 }} />}
        />
      ) : (
        <View className="flex-1 items-center justify-center px-6">
          <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 18, color: Colors.onSurface.DEFAULT, marginBottom: 8 }}>
            No messages yet
          </Text>
          <Text
            style={{
              fontFamily: "WorkSans_400Regular", fontSize: 15,
              color: Colors.onSurface.variant, textAlign: "center", lineHeight: 22,
            }}
          >
            Start discovering and connecting with fellow students to begin chatting
          </Text>
        </View>
      )}
    </View>
  );
}
