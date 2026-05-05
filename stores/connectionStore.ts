import { create } from "zustand";
import type { Connection, Conversation, Group, Message, UserProfile } from "@/types";
import { MOCK_CONNECTIONS, MOCK_CONVERSATIONS, MOCK_GROUPS } from "@/services/mockData";
import { useSettingsStore } from "./settingsStore";
import { notifyNewMessage, notifyMutualMatch } from "@/services/notifications";
import * as db from "@/services/database";
import { useAuthStore } from "./authStore";

type ConnectionStore = {
  connections: Connection[];
  conversations: Conversation[];
  groups: Group[];
  blockedUserIds: string[];
  activeConversationId: string | null;
  /** Whether messaging is using Supabase (true) or mock data (false) */
  useSupabase: boolean;
  loadConnections: () => void;
  addPendingConnection: (user: UserProfile, compatibilityScore: number) => "matched" | "sent";
  acceptIncomingConnection: (userId: string) => void;
  declineIncomingConnection: (userId: string) => void;
  setActiveConversation: (id: string | null) => void;
  sendMessage: (conversationId: string, text: string, replyTo?: { id: string; senderId: string; text: string }) => void;
  deleteMessage: (conversationId: string, messageId: string) => boolean;
  getOrCreateConversation: (userId: string) => Conversation;
  getConversationForUser: (userId: string) => Conversation | undefined;
  /** Load messages from Supabase for a conversation */
  loadMessages: (conversationId: string) => Promise<void>;
  /** Add a message received via Realtime subscription */
  addRealtimeMessage: (conversationId: string, message: Message) => void;
  /** Remove a message that was soft-deleted via Realtime */
  removeRealtimeMessage: (conversationId: string, messageId: string) => void;
  /** Load conversations from Supabase */
  loadConversations: () => Promise<void>;
  /** Get or create a conversation via Supabase */
  getOrCreateConversationAsync: (otherUserId: string) => Promise<Conversation>;
  /** Create a new group with selected members */
  createGroup: (name: string, memberIds: string[]) => Group;
  /** Block a user */
  blockUser: (userId: string) => void;
  /** Unblock a user */
  unblockUser: (userId: string) => void;
};

function getCurrentUserId(): string {
  return useAuthStore.getState().session?.user?.id ?? "current-user";
}

export const useConnectionStore = create<ConnectionStore>((set, get) => ({
  connections: [],
  conversations: [],
  groups: [],
  blockedUserIds: [],
  activeConversationId: null,
  useSupabase: false,

  loadConnections: () => {
    set((state) => {
      const userCreatedConnections = state.connections.filter((conn) => {
        const isMock = MOCK_CONNECTIONS.some((mc) => mc.id === conn.id);
        return !isMock;
      });

      const userConnectedUserIds = new Set(userCreatedConnections.map((c) => c.user.id));
      const filteredMock = MOCK_CONNECTIONS.filter((mc) => !userConnectedUserIds.has(mc.user.id));

      return {
        connections: [...filteredMock, ...userCreatedConnections],
        conversations: state.conversations.length > 0 ? state.conversations : MOCK_CONVERSATIONS,
        groups: MOCK_GROUPS,
      };
    });
  },

  addPendingConnection: (user, compatibilityScore) => {
    const existingConn = get().connections.find((c) => c.user.id === user.id);
    const isMatch = !!(existingConn && existingConn.status === "pending" && existingConn.direction === "incoming");

    set((state) => {
      const existingIndex = state.connections.findIndex((c) => c.user.id === user.id);

      if (existingIndex !== -1) {
        const existing = state.connections[existingIndex];
        if (existing.status === "pending" && existing.direction === "incoming") {
          const updatedConnections = [...state.connections];
          updatedConnections[existingIndex] = {
            ...existing,
            status: "accepted",
            direction: "matched",
            lastMessage: "You're now connected!",
            lastMessageTime: "Now",
            unread: false,
          };

          const newConvo: Conversation = {
            id: `convo-${user.id}`,
            participantIds: [getCurrentUserId(), user.id],
            isGroup: false,
            messages: [],
            createdAt: new Date().toISOString(),
          };

          const settings = useSettingsStore.getState();
          if (settings.notifyNewRequests) {
            const name = `${user.firstName} ${user.lastName}`;
            notifyMutualMatch(name, user.id);
          }

          return {
            connections: updatedConnections,
            conversations: [...state.conversations, newConvo],
          };
        }
        return state;
      }

      const pendingConnection: Connection = {
        id: `pending-${user.id}`,
        user,
        status: "pending",
        direction: "outgoing",
        compatibilityScore,
        lastMessage: "Connection request sent",
        lastMessageTime: "Now",
        unread: false,
        createdAt: new Date().toISOString(),
      };

      return {
        connections: [pendingConnection, ...state.connections],
      };
    });

    return isMatch ? "matched" : "sent";
  },

  acceptIncomingConnection: (userId) => {
    const connection = get().connections.find(
      (c) => c.user.id === userId && c.status === "pending" && c.direction === "incoming",
    );

    set((state) => {
      const updatedConnections = state.connections.map((conn) =>
        conn.user.id === userId && conn.status === "pending" && conn.direction === "incoming"
          ? {
              ...conn,
              status: "accepted" as const,
              direction: "matched" as const,
              lastMessage: "You're now connected!",
              lastMessageTime: "Now",
              unread: false,
            }
          : conn,
      );

      const hasConvo = state.conversations.some(
        (c) => !c.isGroup && c.participantIds.includes(userId),
      );
      const conversations = hasConvo
        ? state.conversations
        : [
            ...state.conversations,
            {
              id: `convo-${userId}`,
              participantIds: [getCurrentUserId(), userId],
              isGroup: false,
              messages: [],
              createdAt: new Date().toISOString(),
            },
          ];

      return { connections: updatedConnections, conversations };
    });

    if (connection) {
      const settings = useSettingsStore.getState();
      if (settings.notifyNewRequests) {
        const name = `${connection.user.firstName} ${connection.user.lastName}`;
        notifyMutualMatch(name, userId);
      }
    }
  },

  declineIncomingConnection: (userId) => {
    set((state) => ({
      connections: state.connections.filter(
        (connection) =>
          !(connection.user.id === userId && connection.status === "pending" && connection.direction === "incoming"),
      ),
    }));
  },

  setActiveConversation: (id) => set({ activeConversationId: id }),

  // ─── Messaging ──────────────────────────────────────────────

  sendMessage: (conversationId, text, replyTo) => {
    const currentUserId = getCurrentUserId();
    const isSupabase = get().useSupabase;

    if (isSupabase) {
      // Optimistic local update — add the message immediately
      const optimisticMsg: Message = {
        id: `pending-${Date.now()}`,
        senderId: currentUserId,
        text,
        timestamp: new Date().toISOString(),
        read: false,
        ...(replyTo ? { replyTo } : {}),
      };

      set((state) => ({
        conversations: state.conversations.map((convo) =>
          convo.id === conversationId
            ? { ...convo, messages: [...convo.messages, optimisticMsg] }
            : convo
        ),
      }));

      // Send to Supabase — the Realtime subscription will add the "real" message
      db.sendMessage(conversationId, currentUserId, text, replyTo)
        .then((savedMsg) => {
          // Replace optimistic message with the real one from DB
          set((state) => ({
            conversations: state.conversations.map((convo) =>
              convo.id === conversationId
                ? {
                    ...convo,
                    messages: convo.messages.map((m) =>
                      m.id === optimisticMsg.id ? savedMsg : m
                    ),
                  }
                : convo
            ),
          }));
        })
        .catch((err) => {
          console.error("Failed to send message:", err);
          // Remove optimistic message on failure
          set((state) => ({
            conversations: state.conversations.map((convo) =>
              convo.id === conversationId
                ? { ...convo, messages: convo.messages.filter((m) => m.id !== optimisticMsg.id) }
                : convo
            ),
          }));
        });
    } else {
      // Mock/offline mode — local only with simulated reply
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        senderId: currentUserId,
        text,
        timestamp: new Date().toISOString(),
        read: false,
        ...(replyTo ? { replyTo } : {}),
      };

      set((state) => ({
        conversations: state.conversations.map((convo) =>
          convo.id === conversationId
            ? { ...convo, messages: [...convo.messages, newMessage] }
            : convo
        ),
      }));

      // Simulate a reply (mock mode only)
      const convo = get().conversations.find((c) => c.id === conversationId);
      if (convo && !convo.isGroup) {
        const otherUserId = convo.participantIds.find((pid) => pid !== currentUserId);
        const connection = get().connections.find((c) => c.user.id === otherUserId);
        if (connection) {
          const settings = useSettingsStore.getState();
          const senderName = `${connection.user.firstName} ${connection.user.lastName}`;
          const replies = [
            "Hey! How's it going?",
            "That sounds great!",
            "I'll get back to you on that 😊",
            "Haha nice one!",
            "For sure, let's do it!",
            "Oh cool, tell me more!",
          ];
          const replyText = replies[Math.floor(Math.random() * replies.length)];

          setTimeout(() => {
            const autoReply: Message = {
              id: `msg-${Date.now()}`,
              senderId: otherUserId!,
              text: replyText,
              timestamp: new Date().toISOString(),
              read: false,
            };

            set((state) => ({
              conversations: state.conversations.map((c) =>
                c.id === conversationId
                  ? { ...c, messages: [...c.messages, autoReply] }
                  : c
              ),
            }));

            if (settings.notifyMessages) {
              notifyNewMessage(senderName, replyText, conversationId);
            }
          }, 2000 + Math.random() * 3000);
        }
      }
    }
  },

  deleteMessage: (conversationId, messageId) => {
    const currentUserId = getCurrentUserId();
    const convo = get().conversations.find((c) => c.id === conversationId);
    const msg = convo?.messages.find((m) => m.id === messageId);
    if (!msg || msg.senderId !== currentUserId) return false;

    const twoHoursMs = 2 * 60 * 60 * 1000;
    const messageAge = Date.now() - new Date(msg.timestamp).getTime();
    if (messageAge > twoHoursMs) return false;

    // Optimistic local removal
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId
          ? { ...c, messages: c.messages.filter((m) => m.id !== messageId) }
          : c
      ),
    }));

    // If using Supabase, also soft-delete on the server
    if (get().useSupabase) {
      db.deleteMessage(messageId, currentUserId).catch((err) => {
        console.error("Failed to delete message on server:", err);
      });
    }

    return true;
  },

  // ─── Conversation management ────────────────────────────────

  getOrCreateConversation: (userId) => {
    const currentUserId = getCurrentUserId();
    const existing = get().conversations.find(
      (convo) => !convo.isGroup && convo.participantIds.includes(userId)
    );
    if (existing) return existing;

    const newConvo: Conversation = {
      id: `convo-${userId}`,
      participantIds: [currentUserId, userId],
      isGroup: false,
      messages: [],
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      conversations: [...state.conversations, newConvo],
    }));

    return newConvo;
  },

  getOrCreateConversationAsync: async (otherUserId) => {
    const currentUserId = getCurrentUserId();

    // Check local first
    const existing = get().conversations.find(
      (convo) => !convo.isGroup && convo.participantIds.includes(otherUserId)
    );
    if (existing) return existing;

    // Create in Supabase
    const convoId = await db.getOrCreateDirectConversation(currentUserId, otherUserId);

    const newConvo: Conversation = {
      id: convoId,
      participantIds: [currentUserId, otherUserId],
      isGroup: false,
      messages: [],
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      conversations: [...state.conversations, newConvo],
    }));

    return newConvo;
  },

  getConversationForUser: (userId) => {
    return get().conversations.find(
      (convo) => !convo.isGroup && convo.participantIds.includes(userId)
    );
  },

  // ─── Supabase sync ─────────────────────────────────────────

  loadConversations: async () => {
    const currentUserId = getCurrentUserId();
    if (currentUserId === "current-user") return; // Not authenticated

    try {
      const convos = await db.getConversationsForUser(currentUserId);
      const conversations: Conversation[] = convos.map((c) => ({
        id: c.id,
        participantIds: c.participantIds,
        isGroup: c.isGroup,
        groupName: c.groupName ?? undefined,
        messages: [],
        createdAt: c.createdAt,
      }));

      set({ conversations, useSupabase: true });
    } catch (err) {
      console.warn("Failed to load conversations from Supabase, using mock data:", err);
      // Fall back to mock data
    }
  },

  loadMessages: async (conversationId) => {
    if (!get().useSupabase) return;

    try {
      const messages = await db.getMessages(conversationId);
      set((state) => ({
        conversations: state.conversations.map((c) =>
          c.id === conversationId ? { ...c, messages } : c
        ),
      }));
    } catch (err) {
      console.error("Failed to load messages:", err);
    }
  },

  addRealtimeMessage: (conversationId, message) => {
    const currentUserId = getCurrentUserId();

    set((state) => {
      const convo = state.conversations.find((c) => c.id === conversationId);
      if (!convo) return state;

      // Don't add duplicate messages (e.g. our own optimistic message)
      const alreadyExists = convo.messages.some((m) => m.id === message.id);
      if (alreadyExists) return state;

      return {
        conversations: state.conversations.map((c) =>
          c.id === conversationId
            ? { ...c, messages: [...c.messages, message] }
            : c
        ),
      };
    });

    // Fire notification for messages from others
    if (message.senderId !== currentUserId) {
      const settings = useSettingsStore.getState();
      if (settings.notifyMessages) {
        const connection = get().connections.find((c) =>
          c.user.id === message.senderId
        );
        const senderName = connection
          ? `${connection.user.firstName} ${connection.user.lastName}`
          : "Someone";
        notifyNewMessage(senderName, message.text, conversationId);
      }
    }
  },

  removeRealtimeMessage: (conversationId, messageId) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId
          ? { ...c, messages: c.messages.filter((m) => m.id !== messageId) }
          : c
      ),
    }));
  },

  createGroup: (name, memberIds) => {
    const currentUserId = getCurrentUserId();
    const members: UserProfile[] = [];

    for (const id of memberIds) {
      const conn = get().connections.find((c) => c.user.id === id);
      if (conn) members.push(conn.user);
    }

    const currentProfile = useAuthStore.getState().profile;
    if (currentProfile) {
      members.unshift(currentProfile);
    }

    const groupId = `group-${Date.now()}`;
    const group: Group = {
      id: groupId,
      name,
      members,
      messages: [],
      createdAt: new Date().toISOString(),
    };

    const groupConvo: Conversation = {
      id: `convo-group-${groupId}`,
      participantIds: [currentUserId, ...memberIds],
      isGroup: true,
      groupName: name,
      messages: [],
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      groups: [group, ...state.groups],
      conversations: [...state.conversations, groupConvo],
    }));

    return group;
  },

  blockUser: (userId) => {
    const currentUserId = getCurrentUserId();
    set((state) => ({
      blockedUserIds: [...state.blockedUserIds, userId],
      connections: state.connections.filter((c) => c.user.id !== userId),
    }));
    if (currentUserId !== "current-user") {
      db.blockUser(currentUserId, userId).catch(() => {});
    }
  },

  unblockUser: (userId) => {
    const currentUserId = getCurrentUserId();
    set((state) => ({
      blockedUserIds: state.blockedUserIds.filter((id) => id !== userId),
    }));
    if (currentUserId !== "current-user") {
      db.unblockUser(currentUserId, userId).catch(() => {});
    }
  },
}));
