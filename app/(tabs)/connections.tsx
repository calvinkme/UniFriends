import { View, Text, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Check, Search, X } from "lucide-react-native";
import { type ReactNode, useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { Colors } from "@/constants";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ConnectionModal } from "@/components/ConnectionModal";
import { useConnectionStore } from "@/stores";
import type { Connection, UserProfile } from "@/types";

function ConnectionCard({
  connection,
  onPress,
  footer,
}: {
  connection: Connection;
  onPress: () => void;
  footer?: ReactNode;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-4 p-4 rounded-lg bg-surface active:scale-[0.98]"
      style={{
        borderWidth: 1,
        borderColor: Colors.outline.variant + "4D",
        shadowColor: Colors.onSurface.DEFAULT,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 1,
      }}
    >
      <Avatar
        uri={connection.user.avatarUrl}
        name={`${connection.user.firstName} ${connection.user.lastName}`}
        size="md"
      />
      <View className="flex-1 min-w-0">
        <View className="flex-row items-center gap-2 mb-0.5">
          <Text
            className="text-on-surface flex-shrink"
            style={{ fontFamily: "Manrope_700Bold", fontSize: 15 }}
            numberOfLines={1}
          >
            {connection.user.firstName} {connection.user.lastName}
          </Text>
          <Badge label={connection.user.degree.split(" ")[0]} />
        </View>
        {connection.lastMessage && (
          <Text
            className="text-on-surface-variant"
            style={{ fontFamily: "WorkSans_400Regular", fontSize: 14 }}
            numberOfLines={1}
          >
            {connection.lastMessage}
          </Text>
        )}
        {footer ? <View style={{ marginTop: 12 }}>{footer}</View> : null}
      </View>
      <View className="items-end">
        {connection.lastMessageTime && (
          <Text
            style={{
              fontFamily: "WorkSans_600SemiBold",
              fontSize: 10,
              color: Colors.onSurface.variant + "99",
              marginBottom: 4,
            }}
          >
            {connection.lastMessageTime}
          </Text>
        )}
        {connection.unread && (
          <View
            style={{
              width: 6, height: 6, borderRadius: 3,
              backgroundColor: Colors.primary.container,
            }}
          />
        )}
      </View>
    </Pressable>
  );
}

export default function ConnectionsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { connections, groups, loadConnections, acceptIncomingConnection, declineIncomingConnection } = useConnectionStore();
  const [activeTab, setActiveTab] = useState<"people" | "groups">("people");
  const [matchedUser, setMatchedUser] = useState<UserProfile | null>(null);

  const handleAccept = (connection: Connection) => {
    acceptIncomingConnection(connection.user.id);
    setMatchedUser(connection.user);
  };

  useEffect(() => {
    loadConnections();
  }, []);

  const acceptedConnections = connections.filter((connection) => connection.status === "accepted");
  const incomingConnections = connections.filter(
    (connection) => connection.status === "pending" && connection.direction === "incoming",
  );
  const pendingConnections = connections.filter(
    (connection) => connection.status === "pending" && connection.direction !== "incoming",
  );
  const recentConnections = acceptedConnections.filter((connection) => connection.user.isOnline);

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 h-16">
        <Text
          className="text-on-surface"
          style={{ fontFamily: "Manrope_800ExtraBold", fontSize: 24, letterSpacing: -0.5 }}
        >
          Connections
        </Text>
        <Pressable className="w-10 h-10 items-center justify-center rounded-lg bg-secondary-container">
          <Search size={20} color={Colors.secondary.DEFAULT} />
        </Pressable>
      </View>

      {/* Segmented Control */}
      <View className="flex-row mx-6 mb-4 bg-surface-container-high rounded-xl p-1">
        {(["people", "groups"] as const).map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`flex-1 items-center py-2.5 rounded-lg ${
              activeTab === tab ? "bg-surface" : ""
            }`}
            style={activeTab === tab ? {
              shadowColor: Colors.onSurface.DEFAULT,
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.08,
              shadowRadius: 4,
              elevation: 2,
            } : undefined}
          >
            <Text
              style={{
                fontFamily: activeTab === tab ? "Manrope_700Bold" : "WorkSans_500Medium",
                fontSize: 14,
                color: activeTab === tab ? Colors.primary.DEFAULT : Colors.onSurface.variant,
                textTransform: "capitalize",
              }}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      {activeTab === "people" ? (
        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          {/* Recent Connections */}
          {recentConnections.length > 0 && (
            <View className="mb-10">
              <View className="flex-row items-center justify-between mb-4">
                <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 17, color: Colors.onSurface.DEFAULT }}>
                  Recent Connections
                </Text>
                <Pressable>
                  <Text style={{ fontFamily: "WorkSans_600SemiBold", fontSize: 14, color: Colors.primary.container }}>
                    See all
                  </Text>
                </Pressable>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 20 }}>
                {acceptedConnections.map((conn) => (
                  <Pressable
                    key={conn.id}
                    onPress={() => router.push(`/chat/${conn.user.id}`)}
                    className="items-center gap-2"
                  >
                    <Avatar
                      uri={conn.user.avatarUrl}
                      name={`${conn.user.firstName} ${conn.user.lastName}`}
                      size="lg"
                      showRing={conn.user.isOnline}
                      showOnline
                      isOnline={conn.user.isOnline}
                    />
                    <Text
                      style={{ fontFamily: "Manrope_700Bold", fontSize: 12, color: Colors.onSurface.DEFAULT }}
                    >
                      {conn.user.firstName}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          )}

          {/* All Connections */}
          <View className="mb-6">
            {incomingConnections.length > 0 && (
              <View style={{ marginBottom: 24 }}>
                <Text
                  style={{
                    fontFamily: "Manrope_700Bold",
                    fontSize: 17,
                    color: Colors.onSurface.DEFAULT,
                    marginBottom: 16,
                  }}
                >
                  Incoming Requests
                </Text>
                <View className="gap-3">
                  {incomingConnections.map((conn) => (
                    <ConnectionCard
                      key={conn.id}
                      connection={conn}
                      onPress={() => {}}
                      footer={
                        <View style={{ flexDirection: "row", gap: 10 }}>
                          <Pressable
                            onPress={() => handleAccept(conn)}
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 6,
                              backgroundColor: Colors.primary.DEFAULT,
                              paddingHorizontal: 12,
                              paddingVertical: 8,
                              borderRadius: 10,
                            }}
                          >
                            <Check size={16} color={Colors.onPrimary.DEFAULT} />
                            <Text style={{ fontFamily: "WorkSans_600SemiBold", color: Colors.onPrimary.DEFAULT }}>
                              Accept
                            </Text>
                          </Pressable>
                          <Pressable
                            onPress={() => declineIncomingConnection(conn.user.id)}
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 6,
                              backgroundColor: Colors.surface.containerHigh,
                              paddingHorizontal: 12,
                              paddingVertical: 8,
                              borderRadius: 10,
                            }}
                          >
                            <X size={16} color={Colors.onSurface.variant} />
                            <Text style={{ fontFamily: "WorkSans_600SemiBold", color: Colors.onSurface.variant }}>
                              Decline
                            </Text>
                          </Pressable>
                        </View>
                      }
                    />
                  ))}
                </View>
              </View>
            )}

            {pendingConnections.length > 0 && (
              <View style={{ marginBottom: 24 }}>
                <Text
                  style={{
                    fontFamily: "Manrope_700Bold",
                    fontSize: 17,
                    color: Colors.onSurface.DEFAULT,
                    marginBottom: 16,
                  }}
                >
                  Pending Requests
                </Text>
                <View className="gap-3">
                  {pendingConnections.map((conn) => (
                    <ConnectionCard
                      key={conn.id}
                      connection={conn}
                      onPress={() => {}}
                    />
                  ))}
                </View>
              </View>
            )}

            <Text
              style={{
                fontFamily: "Manrope_700Bold", fontSize: 17,
                color: Colors.onSurface.DEFAULT, marginBottom: 16,
              }}
            >
              Members
            </Text>
            <View className="gap-3">
              {acceptedConnections.map((conn) => (
                <ConnectionCard
                  key={conn.id}
                  connection={conn}
                  onPress={() => router.push(`/chat/${conn.user.id}`)}
                />
              ))}
            </View>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      ) : (
        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          {groups.length > 0 ? (
            <View className="gap-3 mt-4">
              {groups.map((group) => (
                <Pressable
                  key={group.id}
                  className="p-4 rounded-lg bg-surface active:scale-[0.98]"
                  style={{ borderWidth: 1, borderColor: Colors.outline.variant + "4D" }}
                >
                  <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 16, color: Colors.onSurface.DEFAULT }}>
                    {group.name}
                  </Text>
                  <Text
                    style={{ fontFamily: "WorkSans_400Regular", fontSize: 13, color: Colors.onSurface.variant, marginTop: 4 }}
                  >
                    {group.members.length} members
                  </Text>
                  <View className="flex-row mt-3 -space-x-2">
                    {group.members.slice(0, 4).map((member, i) => (
                      <View key={member.id} style={{ marginLeft: i > 0 ? -8 : 0, zIndex: 4 - i }}>
                        <Avatar uri={member.avatarUrl} name={`${member.firstName}`} size="sm" />
                      </View>
                    ))}
                  </View>
                </Pressable>
              ))}
            </View>
          ) : (
            <View className="flex-1 items-center justify-center py-20">
              <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 16, color: Colors.onSurface.variant }}>
                No groups yet
              </Text>
              <Text
                style={{ fontFamily: "WorkSans_400Regular", fontSize: 14, color: Colors.onSurface.variant, marginTop: 4, textAlign: "center" }}
              >
                Create a group to connect with multiple friends at once
              </Text>
            </View>
          )}
          <View style={{ height: 100 }} />
        </ScrollView>
      )}

      <ConnectionModal
        visible={!!matchedUser}
        user={matchedUser ?? { id: "", firstName: "", lastName: "" } as UserProfile}
        mode="matched"
        onChat={() => {
          const userId = matchedUser?.id;
          setMatchedUser(null);
          if (userId) {
            setTimeout(() => router.push(`/chat/${userId}`), 300);
          }
        }}
        onClose={() => setMatchedUser(null)}
      />
    </View>
  );
}
