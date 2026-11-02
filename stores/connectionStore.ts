import { create } from "zustand";
import type { Connection, Conversation, Group, GroupGenerationFilters, GroupMember, Message, MessageStatus, UserProfile } from "@/types";
import type { ScoredProfile } from "@/services/matchingAlgorithm";
import { MOCK_CONNECTIONS, MOCK_CONVERSATIONS, MOCK_GROUPS, MOCK_USERS, CURRENT_USER } from "@/services/mockData";
import { useSettingsStore } from "./settingsStore";
import { notifyNewMessage, notifyMutualMatch } from "@/services/notifications";
import * as db from "@/services/database";
import { useAuthStore } from "./authStore";
import { useProfileStore } from "./profileStore";
import { selectTopCompatibleMembers, generateGroupName } from "@/services/matchingAlgorithm";
import { USE_MOCK_DATA } from "@/constants/config";

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
  /** Update a message's delivery/read status via Realtime */
  updateMessageStatus: (conversationId: string, messageId: string, status: MessageStatus, deliveredAt?: string | null, readAt?: string | null) => void;
  /** Mark messages in a conversation as read (called when chat is opened) */
  markAsRead: (conversationId: string) => void;
  /** Load conversations from Supabase */
  loadConversations: () => Promise<void>;
  /** Get or create a conversation via Supabase */
  getOrCreateConversationAsync: (otherUserId: string) => Promise<Conversation>;
  /** Create a new group with selected members */
  createGroup: (name: string, memberIds: string[]) => Group;
  /** Create a group from profile objects (for auto-generated groups) */
  createGroupFromProfiles: (name: string, members: UserProfile[], options?: { maxSize?: number; scoredMembers?: ScoredProfile[] }) => Group;
  /** Whether auto-group generation is in progress */
  isGeneratingGroup: boolean;
  /** Auto-generate a group of the given size using the compatibility algorithm */
  generateGroup: (groupSize: number, filters?: GroupGenerationFilters) => Promise<{ group: Group; members: ScoredProfile[] } | null>;
  /** Accept a group invite */
  acceptGroupInvite: (groupId: string) => void;
  /** Decline a group invite */
  declineGroupInvite: (groupId: string) => void;
  /** Get groups where current user has a pending invite */
  getPendingGroupInvites: () => Group[];
  /** Block a user */
  blockUser: (userId: string) => void;
  /** Unblock a user */
  unblockUser: (userId: string) => void;
};

function getCurrentUserId(): string {
  return useAuthStore.getState().session?.user?.id ?? "current-user";
}

/** Map a Supabase profile row into the app's UserProfile shape. */
function mapProfileRow(row: Record<string, unknown>): UserProfile {
  return {
    id: row.id as string,
    firstName: row.first_name as string,
    lastName: row.last_name as string,
    email: row.email as string | undefined,
    avatarUrl: (row.avatar_url as string) ?? "",
    university: row.university as string,
    degree: row.degree as string,
    majors: (row.majors as string[]) ?? [],
    age: (row.age as number) ?? 0,
    academicYear: row.academic_year as 1 | 2 | 3 | 4,
    gpaRanking: row.gpa_ranking as string | undefined,
    activeCourses: (row.active_courses as string[]) ?? [],
    bio: (row.bio as string) ?? "",
    interests: (row.interests as string[]) ?? [],
    isVerified: (row.is_verified as boolean) ?? false,
    isOnline: false,
    createdAt: row.created_at as string,
  };
}

/** Map a Supabase connections row (with joined profile) into a Connection. */
function mapConnectionRow(row: Record<string, unknown>): Connection {
  const profile = mapProfileRow(row.profiles as Record<string, unknown>);
  return {
    id: row.id as string,
    user: profile,
    status: "accepted",
    direction: "matched",
    compatibilityScore: 0,
    unread: false,
    createdAt: row.created_at as string,
  };
}

export const useConnectionStore = create<ConnectionStore>((set, get) => ({
  connections: [],
  conversations: [],
  groups: [],
  blockedUserIds: [],
  activeConversationId: null,
  useSupabase: false,
  isGeneratingGroup: false,

  loadConnections: () => {
    if (USE_MOCK_DATA) {
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
      return;
    }

    // Production: load accepted connections from Supabase.
    const currentUserId = getCurrentUserId();
    if (currentUserId === "current-user") return;
    db.getConnections(currentUserId)
      .then((rows) => {
        const connections = (rows ?? []).map((row) =>
          mapConnectionRow(row as Record<string, unknown>),
        );
        set({ connections });
      })
      .catch((err) => {
        if (__DEV__) console.warn("Failed to load connections from Supabase:", err);
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
        status: "sending",
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
          if (__DEV__) console.error("Failed to send message:", err);
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
        status: "read",
        ...(replyTo ? { replyTo } : {}),
      };

      set((state) => ({
        conversations: state.conversations.map((convo) =>
          convo.id === conversationId
            ? { ...convo, messages: [...convo.messages, newMessage] }
            : convo
        ),
      }));

      // Simulate a reply (mock mode only) — never runs in production.
      const convo = USE_MOCK_DATA ? get().conversations.find((c) => c.id === conversationId) : undefined;
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
              status: "sent",
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
        if (__DEV__) console.error("Failed to delete message on server:", err);
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
      if (__DEV__) console.warn("Failed to load conversations from Supabase, using mock data:", err);
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
      if (__DEV__) console.error("Failed to load messages:", err);
    }
  },

  addRealtimeMessage: (conversationId, message) => {
    const currentUserId = getCurrentUserId();

    set((state) => {
      const convo = state.conversations.find((c) => c.id === conversationId);
      if (!convo) return state;

      // Already have this exact (real) message — nothing to do.
      if (convo.messages.some((m) => m.id === message.id)) return state;

      // If our own message arrives via Realtime, reconcile it with the optimistic
      // placeholder (id "pending-...") instead of appending a duplicate. This is
      // the case where Realtime beats the sendMessage() promise resolution.
      if (message.senderId === currentUserId) {
        const pendingIdx = convo.messages.findIndex(
          (m) => m.id.startsWith("pending-") && m.text === message.text,
        );
        if (pendingIdx !== -1) {
          return {
            conversations: state.conversations.map((c) =>
              c.id === conversationId
                ? { ...c, messages: c.messages.map((m, i) => (i === pendingIdx ? message : m)) }
                : c,
            ),
          };
        }
      }

      return {
        conversations: state.conversations.map((c) =>
          c.id === conversationId
            ? { ...c, messages: [...c.messages, message] }
            : c
        ),
      };
    });

    // Fire notification for messages from others — but not for the chat the
    // user is currently viewing (that conversation is already on screen).
    if (message.senderId !== currentUserId && conversationId !== get().activeConversationId) {
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

  updateMessageStatus: (conversationId, messageId, status, deliveredAt, readAt) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              messages: c.messages.map((m) =>
                m.id === messageId
                  ? { ...m, status, deliveredAt: deliveredAt ?? m.deliveredAt, readAt: readAt ?? m.readAt, read: status === "read" || m.read }
                  : m
              ),
            }
          : c
      ),
    }));
  },

  markAsRead: (conversationId) => {
    const currentUserId = getCurrentUserId();
    if (!get().useSupabase || currentUserId === "current-user") return;
    db.markMessagesDelivered(conversationId, currentUserId).catch(() => {});
    db.markMessagesRead(conversationId, currentUserId).catch(() => {});
  },

  createGroup: (name, memberIds) => {
    const currentUserId = getCurrentUserId();
    const groupMembers: GroupMember[] = [];

    const currentProfile = useAuthStore.getState().profile;
    if (currentProfile) {
      groupMembers.push({ profile: currentProfile, status: "accepted" });
    }

    for (const id of memberIds) {
      const conn = get().connections.find((c) => c.user.id === id);
      if (conn) groupMembers.push({ profile: conn.user, status: "pending" });
    }

    const groupId = `group-${Date.now()}`;
    const totalSize = groupMembers.length;
    const group: Group = {
      id: groupId,
      name,
      members: groupMembers,
      maxSize: totalSize,
      status: "full",
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

  createGroupFromProfiles: (name, members, options) => {
    const currentUserId = getCurrentUserId();
    const currentProfile = useAuthStore.getState().profile;
    const scoreMap = new Map<string, number>();
    if (options?.scoredMembers) {
      for (const sm of options.scoredMembers) {
        scoreMap.set(sm.id, sm.compatibilityScore);
      }
    }

    const groupMembers: GroupMember[] = [];
    if (currentProfile) {
      groupMembers.push({ profile: currentProfile, status: "accepted" });
    }
    for (const m of members) {
      groupMembers.push({
        profile: m,
        status: "pending",
        compatibilityScore: scoreMap.get(m.id),
      });
    }

    const maxSize = options?.maxSize ?? groupMembers.length;
    const groupId = `group-${Date.now()}`;
    const group: Group = {
      id: groupId,
      name,
      members: groupMembers,
      maxSize,
      status: groupMembers.length >= maxSize ? "full" : "pending",
      messages: [],
      createdAt: new Date().toISOString(),
    };

    const groupConvo: Conversation = {
      id: `convo-group-${groupId}`,
      participantIds: [currentUserId, ...members.map((m) => m.id)],
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

  generateGroup: async (groupSize, filters) => {
    set({ isGeneratingGroup: true });
    try {
      const currentUser = useProfileStore.getState().currentUser ?? (USE_MOCK_DATA ? CURRENT_USER : null);
      if (!currentUser) return null;
      const currentUserId = getCurrentUserId();
      const blockedIds = get().blockedUserIds;

      let blockedSet = new Set(blockedIds);
      try {
        if (currentUserId !== "current-user") {
          const serverBlocked = await db.getBlockedUsers(currentUserId);
          for (const id of serverBlocked) blockedSet.add(id);
        }
      } catch {
        // Use local blocked list only
      }

      const excludeIds = new Set([currentUserId, ...blockedSet]);
      let candidates: UserProfile[] = [];

      try {
        if (currentUserId !== "current-user") {
          const rows = await db.getDiscoverableProfiles({ excludeIds: [...excludeIds] });
          if (rows && rows.length > 0) {
            candidates = rows.map((row: Record<string, unknown>) => ({
              id: row.id as string,
              firstName: row.first_name as string,
              lastName: row.last_name as string,
              email: (row.email as string) ?? undefined,
              avatarUrl: (row.avatar_url as string) ?? "",
              university: row.university as string,
              degree: row.degree as string,
              majors: (row.majors as string[]) ?? [],
              age: (row.age as number) ?? 0,
              academicYear: row.academic_year as 1 | 2 | 3 | 4,
              gpaRanking: row.gpa_ranking as string | undefined,
              activeCourses: (row.active_courses as string[]) ?? [],
              bio: (row.bio as string) ?? "",
              interests: (row.interests as string[]) ?? [],
              isVerified: (row.is_verified as boolean) ?? false,
              isOnline: false,
              createdAt: row.created_at as string,
            }));
          }
        }
      } catch {
        // Fall through to mock data
      }

      if (USE_MOCK_DATA) {
        const seenIds = new Set(candidates.map((u) => u.id));
        for (const mockUser of MOCK_USERS) {
          if (!excludeIds.has(mockUser.id) && !seenIds.has(mockUser.id)) {
            candidates.push(mockUser);
          }
        }
      }

      if (filters) {
        if (filters.sameUniversity) {
          candidates = candidates.filter(
            (c) => c.university.toLowerCase() === currentUser.university.toLowerCase(),
          );
        }
        if (filters.sameDegree) {
          candidates = candidates.filter(
            (c) => c.degree.toLowerCase() === currentUser.degree.toLowerCase(),
          );
        }
        if (filters.academicYears.length > 0) {
          const yearSet = new Set(filters.academicYears);
          candidates = candidates.filter((c) => yearSet.has(c.academicYear));
        }
      }

      const needed = groupSize - 1;
      const topMembers = selectTopCompatibleMembers(currentUser, candidates, needed);

      if (topMembers.length === 0) {
        return null;
      }

      const existingNames = get().groups.map((g) => g.name);
      const name = generateGroupName(currentUser, topMembers, existingNames);

      const group = get().createGroupFromProfiles(name, topMembers, {
        maxSize: groupSize,
        scoredMembers: topMembers,
      });
      return { group, members: topMembers };
    } finally {
      set({ isGeneratingGroup: false });
    }
  },

  acceptGroupInvite: (groupId) => {
    const currentUserId = getCurrentUserId();
    set((state) => ({
      groups: state.groups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              members: g.members.map((m) =>
                m.profile.id === currentUserId
                  ? { ...m, status: "accepted" as const, respondedAt: new Date().toISOString() }
                  : m,
              ),
            }
          : g,
      ),
    }));
  },

  declineGroupInvite: (groupId) => {
    const currentUserId = getCurrentUserId();
    set((state) => ({
      groups: state.groups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              members: g.members.map((m) =>
                m.profile.id === currentUserId
                  ? { ...m, status: "declined" as const, respondedAt: new Date().toISOString() }
                  : m,
              ),
            }
          : g,
      ),
      conversations: state.conversations.map((c) =>
        c.id === `convo-group-${groupId}`
          ? { ...c, participantIds: c.participantIds.filter((id) => id !== currentUserId) }
          : c,
      ),
    }));
  },

  getPendingGroupInvites: () => {
    const currentUserId = getCurrentUserId();
    return get().groups.filter((g) =>
      g.members.some((m) => m.profile.id === currentUserId && m.status === "pending"),
    );
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
