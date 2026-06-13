import { View, Text, ScrollView, Pressable, Modal, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Check, Search, X, Plus, Sparkles } from "lucide-react-native";
import { type ReactNode, useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { Colors } from "@/constants";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ConnectionModal } from "@/components/ConnectionModal";
import { GenerateGroupSheet } from "@/components/GenerateGroupSheet";
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
      style={{
        padding: 14,
        borderRadius: 12,
        backgroundColor: Colors.surface.DEFAULT,
        borderWidth: 1,
        borderColor: Colors.outline.variant + "4D",
        shadowColor: Colors.onSurface.DEFAULT,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 1,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 14 }}>
        <Avatar
          uri={connection.user.avatarUrl}
          name={`${connection.user.firstName} ${connection.user.lastName}`}
          size="md"
        />
        <View style={{ flex: 1, minWidth: 0 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <Text
              style={{ fontFamily: "Manrope_700Bold", fontSize: 15, color: Colors.onSurface.DEFAULT, flexShrink: 1 }}
              numberOfLines={1}
            >
              {connection.user.firstName} {connection.user.lastName}
            </Text>
            <Badge label={connection.user.degree.split(" ")[0]} />
          </View>
          {connection.lastMessage && (
            <Text
              style={{ fontFamily: "WorkSans_400Regular", fontSize: 14, color: Colors.onSurface.variant }}
              numberOfLines={1}
            >
              {connection.lastMessage}
            </Text>
          )}
        </View>
        <View style={{ alignItems: "flex-end" }}>
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
      </View>
      {footer && (
        <View style={{ marginTop: 12, paddingLeft: 62 }}>
          {footer}
        </View>
      )}
    </Pressable>
  );
}

export default function ConnectionsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { connections, groups, loadConnections, acceptIncomingConnection, declineIncomingConnection, createGroup, acceptGroupInvite, declineGroupInvite, getPendingGroupInvites } = useConnectionStore();
  const [activeTab, setActiveTab] = useState<"people" | "groups">("people");
  const [matchedUser, setMatchedUser] = useState<UserProfile | null>(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [showGenerateGroup, setShowGenerateGroup] = useState(false);

  const handleAccept = (connection: Connection) => {
    acceptIncomingConnection(connection.user.id);
    setMatchedUser(connection.user);
  };

  const handleCreateGroup = () => {
    if (!groupName.trim() || selectedMemberIds.length === 0) return;
    const group = createGroup(groupName.trim(), selectedMemberIds);
    setShowCreateGroup(false);
    setGroupName("");
    setSelectedMemberIds([]);
    router.push(`/chat/group/${group.id}`);
  };

  const toggleMember = (id: string) => {
    setSelectedMemberIds((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
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
                              gap: 8,
                              backgroundColor: Colors.secondary.DEFAULT,
                              paddingHorizontal: 16,
                              paddingVertical: 10,
                              borderRadius: 10,
                            }}
                          >
                            <Check size={18} color="#FFFFFF" />
                            <Text style={{ fontFamily: "WorkSans_600SemiBold", fontSize: 14, color: "#FFFFFF" }}>
                              Accept
                            </Text>
                          </Pressable>
                          <Pressable
                            onPress={() => declineIncomingConnection(conn.user.id)}
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 8,
                              backgroundColor: Colors.surface.containerHigh,
                              paddingHorizontal: 16,
                              paddingVertical: 10,
                              borderRadius: 10,
                            }}
                          >
                            <X size={18} color={Colors.onSurface.variant} />
                            <Text style={{ fontFamily: "WorkSans_600SemiBold", fontSize: 14, color: Colors.onSurface.variant }}>
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
        <View style={{ flex: 1 }}>
          <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
            {/* Auto-Generate Group Card */}
            <Pressable
              onPress={() => setShowGenerateGroup(true)}
              style={{
                marginTop: 16,
                marginBottom: 12,
                padding: 16,
                borderRadius: 16,
                backgroundColor: Colors.primary.fixed,
                borderWidth: 1,
                borderColor: Colors.primary.container + "66",
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: Colors.primary.DEFAULT,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Sparkles size={20} color={Colors.onPrimary.DEFAULT} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 16, color: Colors.onSurface.DEFAULT }}>
                  Auto-Generate Group
                </Text>
                <Text style={{ fontFamily: "WorkSans_400Regular", fontSize: 13, color: Colors.onSurface.variant, marginTop: 2 }}>
                  Find your most compatible group
                </Text>
              </View>
            </Pressable>

            {/* Pending Group Invites */}
            {getPendingGroupInvites().length > 0 && (
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    fontFamily: "Manrope_700Bold",
                    fontSize: 17,
                    color: Colors.onSurface.DEFAULT,
                    marginBottom: 12,
                  }}
                >
                  Group Invites
                </Text>
                <View className="gap-3">
                  {getPendingGroupInvites().map((group) => {
                    const creator = group.members.find((m) => m.status === "accepted");
                    return (
                      <View
                        key={group.id}
                        style={{
                          padding: 14,
                          borderRadius: 12,
                          backgroundColor: Colors.surface.DEFAULT,
                          borderWidth: 1,
                          borderColor: Colors.primary.container + "66",
                        }}
                      >
                        <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 16, color: Colors.onSurface.DEFAULT }}>
                          {group.name}
                        </Text>
                        {creator && (
                          <Text style={{ fontFamily: "WorkSans_400Regular", fontSize: 13, color: Colors.onSurface.variant, marginTop: 2 }}>
                            Created by {creator.profile.firstName} {creator.profile.lastName}
                          </Text>
                        )}
                        <Text style={{ fontFamily: "WorkSans_400Regular", fontSize: 13, color: Colors.onSurface.variant, marginTop: 2 }}>
                          {group.members.length}/{group.maxSize} members
                        </Text>
                        <View className="flex-row mt-3 -space-x-2 mb-3">
                          {group.members.slice(0, 4).map((member, i) => (
                            <View key={member.profile.id} style={{ marginLeft: i > 0 ? -8 : 0, zIndex: 4 - i }}>
                              <Avatar uri={member.profile.avatarUrl} name={member.profile.firstName} size="sm" />
                            </View>
                          ))}
                        </View>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                          <Pressable
                            onPress={() => {
                              acceptGroupInvite(group.id);
                              router.push(`/chat/group/${group.id}`);
                            }}
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 8,
                              backgroundColor: Colors.secondary.DEFAULT,
                              paddingHorizontal: 16,
                              paddingVertical: 10,
                              borderRadius: 10,
                            }}
                          >
                            <Check size={18} color="#FFFFFF" />
                            <Text style={{ fontFamily: "WorkSans_600SemiBold", fontSize: 14, color: "#FFFFFF" }}>
                              Accept
                            </Text>
                          </Pressable>
                          <Pressable
                            onPress={() => declineGroupInvite(group.id)}
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 8,
                              backgroundColor: Colors.surface.containerHigh,
                              paddingHorizontal: 16,
                              paddingVertical: 10,
                              borderRadius: 10,
                            }}
                          >
                            <X size={18} color={Colors.onSurface.variant} />
                            <Text style={{ fontFamily: "WorkSans_600SemiBold", fontSize: 14, color: Colors.onSurface.variant }}>
                              Decline
                            </Text>
                          </Pressable>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}

            {groups.length > 0 ? (
              <View className="gap-3">
                {groups.map((group) => (
                  <Pressable
                    key={group.id}
                    className="p-4 rounded-lg bg-surface active:scale-[0.98]"
                    style={{ borderWidth: 1, borderColor: Colors.outline.variant + "4D" }}
                    onPress={() => router.push(`/chat/group/${group.id}`)}
                  >
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                      <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 16, color: Colors.onSurface.DEFAULT, flex: 1 }}>
                        {group.name}
                      </Text>
                      {group.status === "pending" && (
                        <Badge label="Pending" />
                      )}
                    </View>
                    <Text
                      style={{ fontFamily: "WorkSans_400Regular", fontSize: 13, color: Colors.onSurface.variant, marginTop: 4 }}
                    >
                      {group.members.length === group.maxSize
                        ? `${group.members.length} members`
                        : `${group.members.length}/${group.maxSize} members`}
                    </Text>
                    <View className="flex-row mt-3 -space-x-2">
                      {group.members.slice(0, 4).map((member, i) => (
                        <View key={member.profile.id} style={{ marginLeft: i > 0 ? -8 : 0, zIndex: 4 - i }}>
                          <Avatar uri={member.profile.avatarUrl} name={member.profile.firstName} size="sm" />
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

          {/* FAB */}
          <Pressable
            onPress={() => setShowCreateGroup(true)}
            style={{
              position: "absolute",
              right: 24,
              bottom: insets.bottom + 88,
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: Colors.primary.DEFAULT,
              alignItems: "center",
              justifyContent: "center",
              elevation: 6,
              shadowColor: Colors.primary.DEFAULT,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
            }}
          >
            <Plus size={24} color={Colors.onPrimary.DEFAULT} />
          </Pressable>

          {/* Create Group Modal */}
          <Modal
            visible={showCreateGroup}
            transparent
            animationType="slide"
            onRequestClose={() => setShowCreateGroup(false)}
          >
            <View style={{ flex: 1, backgroundColor: "#00000044", justifyContent: "flex-end" }}>
              <View
                style={{
                  backgroundColor: Colors.background,
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  paddingTop: 20,
                  paddingBottom: insets.bottom + 24,
                  paddingHorizontal: 24,
                  maxHeight: "80%",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                  <Text style={{ fontFamily: "Manrope_800ExtraBold", fontSize: 20, color: Colors.onSurface.DEFAULT }}>
                    New Group
                  </Text>
                  <Pressable
                    onPress={() => { setShowCreateGroup(false); setGroupName(""); setSelectedMemberIds([]); }}
                    hitSlop={8}
                  >
                    <X size={22} color={Colors.onSurface.variant} />
                  </Pressable>
                </View>

                <TextInput
                  value={groupName}
                  onChangeText={setGroupName}
                  placeholder="Group name"
                  placeholderTextColor={Colors.outline.DEFAULT}
                  style={{
                    backgroundColor: Colors.surface.containerHigh,
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    fontFamily: "WorkSans_400Regular",
                    fontSize: 15,
                    color: Colors.onSurface.DEFAULT,
                    marginBottom: 20,
                  }}
                />

                <Text style={{ fontFamily: "WorkSans_600SemiBold", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: Colors.onSurface.variant, marginBottom: 12 }}>
                  Add Members ({selectedMemberIds.length} selected)
                </Text>

                <ScrollView style={{ maxHeight: 300 }} showsVerticalScrollIndicator={false}>
                  {acceptedConnections.length === 0 ? (
                    <Text style={{ fontFamily: "WorkSans_400Regular", fontSize: 14, color: Colors.onSurface.variant, textAlign: "center", paddingVertical: 20 }}>
                      No connections yet. Connect with people first!
                    </Text>
                  ) : (
                    <View style={{ gap: 8 }}>
                      {acceptedConnections.map((conn) => {
                        const selected = selectedMemberIds.includes(conn.user.id);
                        return (
                          <Pressable
                            key={conn.user.id}
                            onPress={() => toggleMember(conn.user.id)}
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 12,
                              padding: 12,
                              borderRadius: 12,
                              backgroundColor: selected ? Colors.primary.DEFAULT + "14" : Colors.surface.containerLow,
                              borderWidth: 1,
                              borderColor: selected ? Colors.primary.DEFAULT + "44" : "transparent",
                            }}
                          >
                            <Avatar uri={conn.user.avatarUrl} name={`${conn.user.firstName} ${conn.user.lastName}`} size="sm" />
                            <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 15, color: Colors.onSurface.DEFAULT, flex: 1 }}>
                              {conn.user.firstName} {conn.user.lastName}
                            </Text>
                            <View
                              style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                borderWidth: 2,
                                borderColor: selected ? Colors.primary.DEFAULT : Colors.outline.variant,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: selected ? Colors.primary.DEFAULT : "transparent",
                              }}
                            >
                              {selected && <Check size={14} color={Colors.onPrimary.DEFAULT} />}
                            </View>
                          </Pressable>
                        );
                      })}
                    </View>
                  )}
                </ScrollView>

                <View style={{ marginTop: 20 }}>
                  <Button
                    label="Create Group"
                    onPress={handleCreateGroup}
                    fullWidth
                    disabled={!groupName.trim() || selectedMemberIds.length === 0}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
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

      <GenerateGroupSheet
        visible={showGenerateGroup}
        onClose={() => setShowGenerateGroup(false)}
        onGroupCreated={(groupId) => {
          setTimeout(() => router.push(`/chat/group/${groupId}`), 300);
        }}
      />
    </View>
  );
}
