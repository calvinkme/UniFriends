import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Modal,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { ArrowLeft, Send, Smile, X, Reply, Copy, Trash2, MoreVertical, Flag, Ban, Info } from "lucide-react-native";
import * as Clipboard from "expo-clipboard";
import EmojiPicker from "rn-emoji-keyboard";
import { Colors } from "@/constants";
import { Avatar } from "@/components/ui/Avatar";
import { MessageStatus } from "@/components/ui/MessageStatus";
import { useConnectionStore, useAuthStore } from "@/stores";
import { CURRENT_USER } from "@/services/mockData";
import { reportUser } from "@/services/database";
import { useRealtimeMessages } from "@/hooks/useRealtimeMessages";
import type { Message } from "@/types";

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    connections, conversations, sendMessage, getOrCreateConversation,
    getOrCreateConversationAsync, deleteMessage, loadMessages,
    useSupabase, setActiveConversation, blockUser, markAsRead,
  } = useConnectionStore();
  const session = useAuthStore((s) => s.session);
  const currentUserId = session?.user?.id ?? CURRENT_USER.id;

  const [inputText, setInputText] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [detailsMessage, setDetailsMessage] = useState<Message | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const flatListRef = useRef<FlatList<Message>>(null);
  const inputRef = useRef<TextInput>(null);

  const connection = connections.find((c) => c.user.id === id);
  const user = connection?.user;

  // Always find or auto-create a conversation so messaging works for all users
  const conversation = conversations.find(
    (c) => !c.isGroup && c.participantIds.includes(id ?? "")
  );

  // Subscribe to Realtime messages for this conversation
  useRealtimeMessages(conversation?.id ?? null);

  // Load messages from Supabase when entering the chat
  useEffect(() => {
    if (conversation?.id) {
      setActiveConversation(conversation.id);
      if (useSupabase) {
        loadMessages(conversation.id);
      }
      markAsRead(conversation.id);
    }
    return () => setActiveConversation(null);
  }, [conversation?.id, useSupabase]);

  const handleSend = async () => {
    if (!inputText.trim() || !id) return;
    // Ensure conversation exists (creates one if missing)
    let convo = conversation;
    if (!convo) {
      convo = useSupabase
        ? await getOrCreateConversationAsync(id)
        : getOrCreateConversation(id);
    }
    sendMessage(
      convo.id,
      inputText.trim(),
      replyingTo
        ? { id: replyingTo.id, senderId: replyingTo.senderId, text: replyingTo.text }
        : undefined
    );
    setInputText("");
    setReplyingTo(null);
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleLongPress = useCallback((msg: Message) => {
    setSelectedMessage(msg);
  }, []);

  const handleReply = () => {
    if (!selectedMessage) return;
    setReplyingTo(selectedMessage);
    setSelectedMessage(null);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleCopy = async () => {
    if (!selectedMessage) return;
    await Clipboard.setStringAsync(selectedMessage.text);
    setSelectedMessage(null);
  };

  const handleDelete = () => {
    if (!selectedMessage || !conversation) return;
    const success = deleteMessage(conversation.id, selectedMessage.id);
    if (!success) {
      // Could show a toast, but for now just close the menu
    }
    setSelectedMessage(null);
  };

  const handleBlockUser = () => {
    if (!id || !user) return;
    setShowUserMenu(false);
    Alert.alert(
      `Block ${user.firstName}?`,
      "They won't be able to find your profile or message you. You can unblock them later from settings.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Block",
          style: "destructive",
          onPress: () => {
            blockUser(id);
            router.back();
          },
        },
      ],
    );
  };

  const handleReportUser = () => {
    if (!id || !user) return;
    setShowUserMenu(false);
    const reasons = ["Harassment", "Spam", "Fake Profile", "Inappropriate Content", "Other"];
    Alert.alert(
      `Report ${user.firstName}?`,
      "Select a reason for your report. Our team will review it within 24 hours.",
      [
        ...reasons.map((reason) => ({
          text: reason,
          onPress: () => {
            if (currentUserId !== CURRENT_USER.id) {
              reportUser(currentUserId, id, reason).catch(() => {});
            }
            Alert.alert("Report Submitted", "Thank you. We'll review this and take appropriate action.");
          },
        })),
        { text: "Cancel", style: "cancel" as const },
      ],
    );
  };

  // Check if the selected message can be deleted (own message, within 2 hours)
  const canDeleteSelected = useMemo(() => {
    if (!selectedMessage) return false;
    if (selectedMessage.senderId !== currentUserId) return false;
    const twoHoursMs = 2 * 60 * 60 * 1000;
    const messageAge = Date.now() - new Date(selectedMessage.timestamp).getTime();
    return messageAge <= twoHoursMs;
  }, [selectedMessage]);

  const getSenderName = (senderId: string) => {
    if (senderId === currentUserId) return "You";
    return user?.firstName ?? "User";
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDetailTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDetails = () => {
    if (!selectedMessage) return;
    setDetailsMessage(selectedMessage);
    setSelectedMessage(null);
  };

  if (!user) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 16, color: Colors.onSurface.variant }}>
          User not found
        </Text>
      </View>
    );
  }

  const messages = conversation?.messages ?? [];
  const bottomInset = Platform.OS === "android" ? Math.max(insets.bottom, 16) : Math.max(insets.bottom, 12);
  const composerPaddingBottom = bottomInset + 8;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.background }}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <View style={{ flex: 1, paddingTop: insets.top }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            height: 56,
            gap: 12,
            borderBottomWidth: 0.5,
            borderBottomColor: Colors.outline.variant + "50",
          }}
        >
          <Pressable
            onPress={() => router.back()}
            style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center" }}
            hitSlop={8}
          >
            <ArrowLeft size={22} color={Colors.onSurface.DEFAULT} />
          </Pressable>
          <Avatar
            uri={user.avatarUrl}
            name={`${user.firstName} ${user.lastName}`}
            size="sm"
            showOnline
            isOnline={user.isOnline}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 16, color: Colors.onSurface.DEFAULT }}>
              {user.firstName} {user.lastName}
            </Text>
            <Text style={{ fontFamily: "WorkSans_400Regular", fontSize: 12, color: Colors.onSurface.variant }}>
              {user.isOnline ? "Online" : "Offline"}
            </Text>
          </View>
          <Pressable
            onPress={() => setShowUserMenu(true)}
            style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center" }}
            hitSlop={8}
          >
            <MoreVertical size={20} color={Colors.onSurface.variant} />
          </Pressable>
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16, gap: 8, paddingBottom: 24 }}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
          renderItem={({ item: msg }) => {
            const isMine = msg.senderId === currentUserId;
            return (
              <Pressable
                onLongPress={() => handleLongPress(msg)}
                delayLongPress={400}
                style={{ flexDirection: "row", justifyContent: isMine ? "flex-end" : "flex-start" }}
              >
                <View
                  style={{
                    maxWidth: "80%",
                    backgroundColor: isMine ? Colors.primary.container : Colors.surface.containerLow,
                    borderRadius: 16,
                    borderTopRightRadius: isMine ? 4 : 16,
                    borderTopLeftRadius: isMine ? 16 : 4,
                    overflow: "hidden",
                  }}
                >
                  {/* Reply preview inside bubble */}
                  {msg.replyTo && (
                    <View
                      style={{
                        borderLeftWidth: 3,
                        borderLeftColor: isMine ? Colors.onPrimary.container : Colors.primary.DEFAULT,
                        backgroundColor: isMine
                          ? Colors.primary.DEFAULT + "20"
                          : Colors.surface.container,
                        marginHorizontal: 8,
                        marginTop: 8,
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 6,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "WorkSans_600SemiBold",
                          fontSize: 12,
                          color: isMine ? Colors.onPrimary.container : Colors.primary.DEFAULT,
                          marginBottom: 2,
                        }}
                        numberOfLines={1}
                      >
                        {getSenderName(msg.replyTo.senderId)}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "WorkSans_400Regular",
                          fontSize: 13,
                          color: isMine
                            ? Colors.onPrimary.container + "CC"
                            : Colors.onSurface.variant,
                        }}
                        numberOfLines={2}
                      >
                        {msg.replyTo.text}
                      </Text>
                    </View>
                  )}
                  <View style={{ paddingHorizontal: 14, paddingTop: 10, paddingBottom: 6 }}>
                    <Text
                      style={{
                        fontFamily: "WorkSans_400Regular",
                        fontSize: 15,
                        lineHeight: 22,
                        color: isMine ? Colors.onPrimary.container : Colors.onSurface.DEFAULT,
                      }}
                    >
                      {msg.text}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: 4,
                        marginTop: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "WorkSans_400Regular",
                          fontSize: 11,
                          color: isMine
                            ? Colors.onPrimary.container + "99"
                            : Colors.onSurface.variant + "99",
                        }}
                      >
                        {formatTime(msg.timestamp)}
                      </Text>
                      {isMine && <MessageStatus status={msg.status} size={14} />}
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          }}
          ListEmptyComponent={
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 80 }}>
              <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 15, color: Colors.onSurface.variant }}>
                Say hello to {user.firstName}!
              </Text>
            </View>
          }
        />

        {/* Reply preview bar */}
        {replyingTo && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 10,
              backgroundColor: Colors.surface.containerLow,
              borderTopWidth: 0.5,
              borderTopColor: Colors.outline.variant + "50",
              gap: 10,
            }}
          >
            <View
              style={{
                width: 3,
                alignSelf: "stretch",
                backgroundColor: Colors.primary.DEFAULT,
                borderRadius: 2,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "WorkSans_600SemiBold",
                  fontSize: 13,
                  color: Colors.primary.DEFAULT,
                  marginBottom: 2,
                }}
                numberOfLines={1}
              >
                {getSenderName(replyingTo.senderId)}
              </Text>
              <Text
                style={{
                  fontFamily: "WorkSans_400Regular",
                  fontSize: 13,
                  color: Colors.onSurface.variant,
                }}
                numberOfLines={1}
              >
                {replyingTo.text}
              </Text>
            </View>
            <Pressable
              onPress={() => setReplyingTo(null)}
              hitSlop={8}
              style={{
                width: 32,
                height: 32,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 16,
              }}
            >
              <X size={18} color={Colors.onSurface.variant} />
            </Pressable>
          </View>
        )}

        {/* Input Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            gap: 8,
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: composerPaddingBottom,
            borderTopWidth: replyingTo ? 0 : 0.5,
            borderTopColor: Colors.outline.variant + "50",
            backgroundColor: Colors.background,
          }}
        >
          <Pressable
            onPress={() => setEmojiOpen(true)}
            style={{
              width: 48,
              height: 48,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 24,
            }}
            hitSlop={4}
          >
            <Smile size={22} color={Colors.onSurface.variant} />
          </Pressable>
          <TextInput
            ref={inputRef}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            placeholderTextColor={Colors.outline.DEFAULT}
            multiline
            style={{
              flex: 1,
              backgroundColor: Colors.surface.containerHigh,
              borderRadius: 16,
              paddingHorizontal: 16,
              paddingVertical: 12,
              maxHeight: 96,
              fontFamily: "WorkSans_400Regular",
              fontSize: 15,
              color: Colors.onSurface.DEFAULT,
            }}
          />
          <Pressable
            onPress={handleSend}
            disabled={!inputText.trim()}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: inputText.trim() ? Colors.primary.DEFAULT : Colors.surface.containerHigh,
            }}
          >
            <Send
              size={24}
              color={inputText.trim() ? Colors.onPrimary.DEFAULT : Colors.onSurface.variant}
            />
          </Pressable>
        </View>

        {/* Emoji Picker */}
        <EmojiPicker
          onEmojiSelected={(emoji) => setInputText((prev) => prev + emoji.emoji)}
          open={emojiOpen}
          onClose={() => setEmojiOpen(false)}
          theme={{
            backdrop: "#00000066",
            knob: Colors.outline.variant,
            container: Colors.surface.containerLowest,
            header: Colors.onSurface.DEFAULT,
            skinTonesContainer: Colors.surface.containerHigh,
            category: {
              icon: Colors.onSurface.variant,
              iconActive: Colors.primary.DEFAULT,
              container: Colors.surface.containerLow,
              containerActive: Colors.primary.container,
            },
            search: {
              text: Colors.onSurface.DEFAULT,
              placeholder: Colors.outline.DEFAULT,
              icon: Colors.onSurface.variant,
              background: Colors.surface.containerHigh,
            },
          }}
        />

        {/* Long-press action menu */}
        <Modal
          visible={selectedMessage !== null}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedMessage(null)}
        >
          <Pressable
            style={{ flex: 1, backgroundColor: "#00000044", justifyContent: "center", alignItems: "center" }}
            onPress={() => setSelectedMessage(null)}
          >
            <Pressable
              style={{
                backgroundColor: Colors.surface.containerLowest,
                borderRadius: 16,
                width: 220,
                overflow: "hidden",
                elevation: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
              }}
              onPress={() => {}}
            >
              {/* Preview of selected message */}
              <View
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  backgroundColor: Colors.surface.containerLow,
                  borderBottomWidth: 0.5,
                  borderBottomColor: Colors.outline.variant + "33",
                }}
              >
                <Text
                  style={{
                    fontFamily: "WorkSans_400Regular",
                    fontSize: 13,
                    color: Colors.onSurface.variant,
                  }}
                  numberOfLines={2}
                >
                  {selectedMessage?.text}
                </Text>
              </View>

              {/* Reply option */}
              <Pressable
                onPress={handleReply}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  backgroundColor: pressed ? Colors.surface.containerHigh : "transparent",
                })}
              >
                <Reply size={18} color={Colors.onSurface.DEFAULT} />
                <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 15, color: Colors.onSurface.DEFAULT }}>
                  Reply
                </Text>
              </Pressable>

              {/* Copy option */}
              <View style={{ height: 0.5, backgroundColor: Colors.outline.variant + "33" }} />
              <Pressable
                onPress={handleCopy}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  backgroundColor: pressed ? Colors.surface.containerHigh : "transparent",
                })}
              >
                <Copy size={18} color={Colors.onSurface.DEFAULT} />
                <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 15, color: Colors.onSurface.DEFAULT }}>
                  Copy
                </Text>
              </Pressable>

              {/* Details option — only for own messages */}
              {selectedMessage?.senderId === currentUserId && (
                <>
                  <View style={{ height: 0.5, backgroundColor: Colors.outline.variant + "33" }} />
                  <Pressable
                    onPress={handleDetails}
                    style={({ pressed }) => ({
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                      paddingHorizontal: 16,
                      paddingVertical: 14,
                      backgroundColor: pressed ? Colors.surface.containerHigh : "transparent",
                    })}
                  >
                    <Info size={18} color={Colors.onSurface.DEFAULT} />
                    <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 15, color: Colors.onSurface.DEFAULT }}>
                      Details
                    </Text>
                  </Pressable>
                </>
              )}

              {/* Delete option — only for own messages within 2 hours */}
              {canDeleteSelected && (
                <>
                  <View style={{ height: 0.5, backgroundColor: Colors.outline.variant + "33" }} />
                  <Pressable
                    onPress={handleDelete}
                    style={({ pressed }) => ({
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                      paddingHorizontal: 16,
                      paddingVertical: 14,
                      backgroundColor: pressed ? Colors.error.container : "transparent",
                    })}
                  >
                    <Trash2 size={18} color={Colors.error.DEFAULT} />
                    <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 15, color: Colors.error.DEFAULT }}>
                      Delete
                    </Text>
                  </Pressable>
                </>
              )}
            </Pressable>
          </Pressable>
        </Modal>
        {/* User action menu */}
        <Modal
          visible={showUserMenu}
          transparent
          animationType="fade"
          onRequestClose={() => setShowUserMenu(false)}
        >
          <Pressable
            style={{ flex: 1, backgroundColor: "#00000044", justifyContent: "center", alignItems: "center" }}
            onPress={() => setShowUserMenu(false)}
          >
            <Pressable
              style={{
                backgroundColor: Colors.surface.containerLowest,
                borderRadius: 16,
                width: 240,
                overflow: "hidden",
                elevation: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
              }}
              onPress={() => {}}
            >
              <Pressable
                onPress={handleReportUser}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  backgroundColor: pressed ? Colors.surface.containerHigh : "transparent",
                })}
              >
                <Flag size={18} color={Colors.onSurface.DEFAULT} />
                <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 15, color: Colors.onSurface.DEFAULT }}>
                  Report {user?.firstName}
                </Text>
              </Pressable>

              <View style={{ height: 0.5, backgroundColor: Colors.outline.variant + "33" }} />

              <Pressable
                onPress={handleBlockUser}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  backgroundColor: pressed ? Colors.error.container : "transparent",
                })}
              >
                <Ban size={18} color={Colors.error.DEFAULT} />
                <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 15, color: Colors.error.DEFAULT }}>
                  Block {user?.firstName}
                </Text>
              </Pressable>
            </Pressable>
          </Pressable>
        </Modal>

        {/* Message details modal */}
        <Modal
          visible={detailsMessage !== null}
          transparent
          animationType="fade"
          onRequestClose={() => setDetailsMessage(null)}
        >
          <Pressable
            style={{ flex: 1, backgroundColor: "#00000044", justifyContent: "center", alignItems: "center" }}
            onPress={() => setDetailsMessage(null)}
          >
            <Pressable
              style={{
                backgroundColor: Colors.surface.containerLowest,
                borderRadius: 16,
                width: 280,
                overflow: "hidden",
                elevation: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
              }}
              onPress={() => {}}
            >
              {/* Header */}
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                  borderBottomWidth: 0.5,
                  borderBottomColor: Colors.outline.variant + "33",
                }}
              >
                <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 16, color: Colors.onSurface.DEFAULT }}>
                  Message Details
                </Text>
              </View>

              {/* Message preview */}
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  backgroundColor: Colors.surface.containerLow,
                }}
              >
                <Text
                  style={{
                    fontFamily: "WorkSans_400Regular",
                    fontSize: 14,
                    color: Colors.onSurface.variant,
                  }}
                  numberOfLines={3}
                >
                  {detailsMessage?.text}
                </Text>
              </View>

              {/* Status rows */}
              <View style={{ paddingHorizontal: 20, paddingVertical: 16, gap: 14 }}>
                {/* Sent */}
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <MessageStatus status="sent" size={16} />
                    <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 14, color: Colors.onSurface.DEFAULT }}>
                      Sent
                    </Text>
                  </View>
                  <Text style={{ fontFamily: "WorkSans_400Regular", fontSize: 13, color: Colors.onSurface.variant }}>
                    {detailsMessage ? formatDetailTime(detailsMessage.timestamp) : ""}
                  </Text>
                </View>

                {/* Delivered */}
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <MessageStatus status="delivered" size={16} />
                    <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 14, color: Colors.onSurface.DEFAULT }}>
                      Delivered
                    </Text>
                  </View>
                  <Text style={{ fontFamily: "WorkSans_400Regular", fontSize: 13, color: Colors.onSurface.variant }}>
                    {detailsMessage?.deliveredAt
                      ? formatDetailTime(detailsMessage.deliveredAt)
                      : "—"}
                  </Text>
                </View>

                {/* Read */}
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <MessageStatus status="read" size={16} />
                    <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 14, color: Colors.onSurface.DEFAULT }}>
                      Read
                    </Text>
                  </View>
                  <Text style={{ fontFamily: "WorkSans_400Regular", fontSize: 13, color: Colors.onSurface.variant }}>
                    {detailsMessage?.readAt
                      ? formatDetailTime(detailsMessage.readAt)
                      : "—"}
                  </Text>
                </View>
              </View>

              {/* Close button */}
              <Pressable
                onPress={() => setDetailsMessage(null)}
                style={({ pressed }) => ({
                  paddingVertical: 14,
                  alignItems: "center",
                  borderTopWidth: 0.5,
                  borderTopColor: Colors.outline.variant + "33",
                  backgroundColor: pressed ? Colors.surface.containerHigh : "transparent",
                })}
              >
                <Text style={{ fontFamily: "WorkSans_600SemiBold", fontSize: 15, color: Colors.primary.DEFAULT }}>
                  Close
                </Text>
              </Pressable>
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}
