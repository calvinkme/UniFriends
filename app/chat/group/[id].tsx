import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Modal,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { useState, useRef, useCallback, useMemo } from "react";
import { ArrowLeft, Send, Smile, X, Reply, Copy, Trash2 } from "lucide-react-native";
import * as Clipboard from "expo-clipboard";
import EmojiPicker from "rn-emoji-keyboard";
import { Colors } from "@/constants";
import { Avatar } from "@/components/ui/Avatar";
import { useConnectionStore, useAuthStore } from "@/stores";
import { CURRENT_USER } from "@/services/mockData";
import type { Message } from "@/types";

export default function GroupChatScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { groups, conversations, sendMessage, deleteMessage } = useConnectionStore();
  const session = useAuthStore((s) => s.session);
  const currentUserId = session?.user?.id ?? CURRENT_USER.id;

  const [inputText, setInputText] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const flatListRef = useRef<FlatList<Message>>(null);
  const inputRef = useRef<TextInput>(null);

  const group = groups.find((g) => g.id === id);
  const conversation = conversations.find((c) => c.id === `convo-group-${id}`);

  const getMemberName = (senderId: string): string => {
    if (senderId === currentUserId) return "You";
    const member = group?.members.find((m) => m.id === senderId);
    return member?.firstName ?? "Member";
  };

  const getMemberAvatar = (senderId: string) => {
    const member = group?.members.find((m) => m.id === senderId);
    return { uri: member?.avatarUrl ?? "", name: member ? `${member.firstName} ${member.lastName}` : "" };
  };

  const handleSend = () => {
    if (!inputText.trim() || !conversation) return;
    sendMessage(
      conversation.id,
      inputText.trim(),
      replyingTo ? { id: replyingTo.id, senderId: replyingTo.senderId, text: replyingTo.text } : undefined,
    );
    setInputText("");
    setReplyingTo(null);
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
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
    deleteMessage(conversation.id, selectedMessage.id);
    setSelectedMessage(null);
  };

  const canDeleteSelected = useMemo(() => {
    if (!selectedMessage) return false;
    if (selectedMessage.senderId !== currentUserId) return false;
    const twoHoursMs = 2 * 60 * 60 * 1000;
    return Date.now() - new Date(selectedMessage.timestamp).getTime() <= twoHoursMs;
  }, [selectedMessage, currentUserId]);

  if (!group) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 16, color: Colors.onSurface.variant }}>
          Group not found
        </Text>
      </View>
    );
  }

  const messages = conversation?.messages ?? [];
  const bottomInset = Platform.OS === "android" ? Math.max(insets.bottom, 16) : Math.max(insets.bottom, 12);

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
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: "Manrope_700Bold", fontSize: 16, color: Colors.onSurface.DEFAULT }}>
              {group.name}
            </Text>
            <Text style={{ fontFamily: "WorkSans_400Regular", fontSize: 12, color: Colors.onSurface.variant }}>
              {group.members.length} members
            </Text>
          </View>
          {/* Member avatars stack */}
          <View style={{ flexDirection: "row" }}>
            {group.members.slice(0, 3).map((m, i) => (
              <View key={m.id} style={{ marginLeft: i > 0 ? -8 : 0, zIndex: 3 - i }}>
                <Avatar uri={m.avatarUrl} name={`${m.firstName}`} size="xs" />
              </View>
            ))}
          </View>
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
            const avatar = getMemberAvatar(msg.senderId);
            return (
              <Pressable
                onLongPress={() => handleLongPress(msg)}
                delayLongPress={400}
                style={{ flexDirection: "row", justifyContent: isMine ? "flex-end" : "flex-start", gap: 8, alignItems: "flex-end" }}
              >
                {!isMine && <Avatar uri={avatar.uri} name={avatar.name} size="xs" />}
                <View style={{ maxWidth: "75%" }}>
                  {!isMine && (
                    <Text
                      style={{
                        fontFamily: "WorkSans_600SemiBold",
                        fontSize: 12,
                        color: Colors.primary.DEFAULT,
                        marginBottom: 2,
                        marginLeft: 4,
                      }}
                    >
                      {getMemberName(msg.senderId)}
                    </Text>
                  )}
                  <View
                    style={{
                      backgroundColor: isMine ? Colors.primary.container : Colors.surface.containerLow,
                      borderRadius: 16,
                      borderTopRightRadius: isMine ? 4 : 16,
                      borderTopLeftRadius: isMine ? 16 : 4,
                      overflow: "hidden",
                    }}
                  >
                    {msg.replyTo && (
                      <View
                        style={{
                          borderLeftWidth: 3,
                          borderLeftColor: isMine ? Colors.onPrimary.container : Colors.primary.DEFAULT,
                          backgroundColor: isMine ? Colors.primary.DEFAULT + "20" : Colors.surface.container,
                          marginHorizontal: 8,
                          marginTop: 8,
                          paddingHorizontal: 10,
                          paddingVertical: 6,
                          borderRadius: 6,
                        }}
                      >
                        <Text
                          style={{ fontFamily: "WorkSans_600SemiBold", fontSize: 12, color: isMine ? Colors.onPrimary.container : Colors.primary.DEFAULT, marginBottom: 2 }}
                          numberOfLines={1}
                        >
                          {getMemberName(msg.replyTo.senderId)}
                        </Text>
                        <Text
                          style={{ fontFamily: "WorkSans_400Regular", fontSize: 13, color: isMine ? Colors.onPrimary.container + "CC" : Colors.onSurface.variant }}
                          numberOfLines={2}
                        >
                          {msg.replyTo.text}
                        </Text>
                      </View>
                    )}
                    <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
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
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          }}
          ListEmptyComponent={
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 80 }}>
              <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 15, color: Colors.onSurface.variant }}>
                Start the conversation!
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
            <View style={{ width: 3, alignSelf: "stretch", backgroundColor: Colors.primary.DEFAULT, borderRadius: 2 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: "WorkSans_600SemiBold", fontSize: 13, color: Colors.primary.DEFAULT, marginBottom: 2 }} numberOfLines={1}>
                {getMemberName(replyingTo.senderId)}
              </Text>
              <Text style={{ fontFamily: "WorkSans_400Regular", fontSize: 13, color: Colors.onSurface.variant }} numberOfLines={1}>
                {replyingTo.text}
              </Text>
            </View>
            <Pressable onPress={() => setReplyingTo(null)} hitSlop={8} style={{ width: 32, height: 32, alignItems: "center", justifyContent: "center", borderRadius: 16 }}>
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
            paddingBottom: bottomInset + 8,
            borderTopWidth: replyingTo ? 0 : 0.5,
            borderTopColor: Colors.outline.variant + "50",
            backgroundColor: Colors.background,
          }}
        >
          <Pressable
            onPress={() => setEmojiOpen(true)}
            style={{ width: 44, height: 44, alignItems: "center", justifyContent: "center", borderRadius: 22 }}
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
              width: 44,
              height: 44,
              borderRadius: 22,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: inputText.trim() ? Colors.primary.DEFAULT : Colors.surface.containerHigh,
            }}
          >
            <Send size={18} color={inputText.trim() ? Colors.onPrimary.DEFAULT : Colors.onSurface.variant} />
          </Pressable>
        </View>

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
              <View
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  backgroundColor: Colors.surface.containerLow,
                  borderBottomWidth: 0.5,
                  borderBottomColor: Colors.outline.variant + "33",
                }}
              >
                <Text style={{ fontFamily: "WorkSans_400Regular", fontSize: 13, color: Colors.onSurface.variant }} numberOfLines={2}>
                  {selectedMessage?.text}
                </Text>
              </View>

              <Pressable
                onPress={handleReply}
                style={({ pressed }) => ({
                  flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 16, paddingVertical: 14,
                  backgroundColor: pressed ? Colors.surface.containerHigh : "transparent",
                })}
              >
                <Reply size={18} color={Colors.onSurface.DEFAULT} />
                <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 15, color: Colors.onSurface.DEFAULT }}>Reply</Text>
              </Pressable>

              <View style={{ height: 0.5, backgroundColor: Colors.outline.variant + "33" }} />
              <Pressable
                onPress={handleCopy}
                style={({ pressed }) => ({
                  flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 16, paddingVertical: 14,
                  backgroundColor: pressed ? Colors.surface.containerHigh : "transparent",
                })}
              >
                <Copy size={18} color={Colors.onSurface.DEFAULT} />
                <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 15, color: Colors.onSurface.DEFAULT }}>Copy</Text>
              </Pressable>

              {canDeleteSelected && (
                <>
                  <View style={{ height: 0.5, backgroundColor: Colors.outline.variant + "33" }} />
                  <Pressable
                    onPress={handleDelete}
                    style={({ pressed }) => ({
                      flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 16, paddingVertical: 14,
                      backgroundColor: pressed ? Colors.error.container : "transparent",
                    })}
                  >
                    <Trash2 size={18} color={Colors.error.DEFAULT} />
                    <Text style={{ fontFamily: "WorkSans_500Medium", fontSize: 15, color: Colors.error.DEFAULT }}>Delete</Text>
                  </Pressable>
                </>
              )}
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}
