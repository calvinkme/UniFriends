import { supabase } from "./supabase";
import type { UserProfile, DbMessage, DbConversation, Message, MessageStatus } from "@/types";

// ─── Profile operations ──────────────────────────────────────

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
}

export async function updateProfile(userId: string, updates: Partial<UserProfile>) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getDiscoverableProfiles(filters: {
  fieldOfStudy?: string;
  academicYear?: number;
  interests?: string[];
  excludeIds?: string[];
}) {
  let query = supabase.from("profiles").select("*");

  if (filters.fieldOfStudy) {
    query = query.eq("degree", filters.fieldOfStudy);
  }
  if (filters.academicYear) {
    query = query.eq("academic_year", filters.academicYear);
  }
  if (filters.excludeIds?.length) {
    query = query.not("id", "in", `(${filters.excludeIds.join(",")})`);
  }

  const { data, error } = await query.limit(20);
  if (error) throw error;
  return data;
}

// ─── Connection operations ───────────────────────────────────

export async function getConnections(userId: string) {
  const { data, error } = await supabase
    .from("connections")
    .select("*, profiles!connections_user_b_id_fkey(*)")
    .eq("user_a_id", userId)
    .eq("status", "accepted");
  if (error) throw error;
  return data;
}

export async function createConnection(userAId: string, userBId: string) {
  const { data, error } = await supabase
    .from("connections")
    .insert({ user_a_id: userAId, user_b_id: userBId, status: "pending" })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ─── Conversation operations ─────────────────────────────────

/**
 * Get all conversations for a user, including participant IDs.
 */
export async function getConversationsForUser(userId: string) {
  // Get all conversation IDs this user is part of
  const { data: participantRows, error: pError } = await supabase
    .from("conversation_participants")
    .select("conversation_id")
    .eq("user_id", userId);

  if (pError) throw pError;
  if (!participantRows?.length) return [];

  const conversationIds = participantRows.map((r) => r.conversation_id);

  // Fetch conversations
  const { data: convos, error: cError } = await supabase
    .from("conversations")
    .select("*")
    .in("id", conversationIds);

  if (cError) throw cError;

  // Fetch all participants for these conversations
  const { data: allParticipants, error: apError } = await supabase
    .from("conversation_participants")
    .select("conversation_id, user_id")
    .in("conversation_id", conversationIds);

  if (apError) throw apError;

  // Group participants by conversation
  const participantsByConvo = new Map<string, string[]>();
  for (const p of allParticipants ?? []) {
    const list = participantsByConvo.get(p.conversation_id) ?? [];
    list.push(p.user_id);
    participantsByConvo.set(p.conversation_id, list);
  }

  return (convos ?? []).map((c: DbConversation) => ({
    id: c.id,
    isGroup: c.is_group,
    groupName: c.group_name,
    participantIds: participantsByConvo.get(c.id) ?? [],
    createdAt: c.created_at,
  }));
}

/**
 * Find a 1:1 conversation between two users, or return null.
 */
export async function findDirectConversation(
  userId: string,
  otherUserId: string,
): Promise<string | null> {
  // Get conversations for the current user
  const { data: myConvos, error: e1 } = await supabase
    .from("conversation_participants")
    .select("conversation_id")
    .eq("user_id", userId);

  if (e1) throw e1;
  if (!myConvos?.length) return null;

  const myConvoIds = myConvos.map((r) => r.conversation_id);

  // Find which of those the other user is also in
  const { data: shared, error: e2 } = await supabase
    .from("conversation_participants")
    .select("conversation_id")
    .eq("user_id", otherUserId)
    .in("conversation_id", myConvoIds);

  if (e2) throw e2;
  if (!shared?.length) return null;

  // Check it's a 1:1 (not a group)
  const { data: convo, error: e3 } = await supabase
    .from("conversations")
    .select("id")
    .in("id", shared.map((r) => r.conversation_id))
    .eq("is_group", false)
    .limit(1)
    .single();

  if (e3) return null;
  return convo?.id ?? null;
}

/**
 * Create a new 1:1 conversation between two users.
 */
export async function createDirectConversation(
  userId: string,
  otherUserId: string,
): Promise<string> {
  // Create conversation
  const { data: convo, error: cError } = await supabase
    .from("conversations")
    .insert({ is_group: false })
    .select()
    .single();

  if (cError) throw cError;

  // Add both participants
  const { error: pError } = await supabase
    .from("conversation_participants")
    .insert([
      { conversation_id: convo.id, user_id: userId },
      { conversation_id: convo.id, user_id: otherUserId },
    ]);

  if (pError) throw pError;

  return convo.id;
}

/**
 * Find or create a direct conversation between two users.
 */
export async function getOrCreateDirectConversation(
  userId: string,
  otherUserId: string,
): Promise<string> {
  const existing = await findDirectConversation(userId, otherUserId);
  if (existing) return existing;
  return createDirectConversation(userId, otherUserId);
}

// ─── Message operations ──────────────────────────────────────

function deriveStatus(row: DbMessage): MessageStatus {
  if (row.read_at) return "read";
  if (row.delivered_at) return "delivered";
  return "sent";
}

/** Convert a Supabase message row into the app's Message type. */
function toAppMessage(row: DbMessage): Message {
  return {
    id: row.id,
    senderId: row.sender_id,
    text: row.text,
    timestamp: row.created_at,
    read: row.read,
    status: deriveStatus(row),
    deliveredAt: row.delivered_at,
    readAt: row.read_at,
    deletedAt: row.deleted_at,
    ...(row.reply_to_id
      ? {
          replyTo: {
            id: row.reply_to_id,
            senderId: row.reply_to_sender_id ?? "",
            text: row.reply_to_text ?? "",
          },
        }
      : {}),
  };
}

/**
 * Load all non-deleted messages for a conversation.
 */
export async function getMessages(conversationId: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .is("deleted_at", null)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(toAppMessage);
}

/**
 * Send a message to a conversation.
 */
export async function sendMessage(
  conversationId: string,
  senderId: string,
  text: string,
  replyTo?: { id: string; senderId: string; text: string },
): Promise<Message> {
  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      sender_id: senderId,
      text,
      reply_to_id: replyTo?.id ?? null,
      reply_to_sender_id: replyTo?.senderId ?? null,
      reply_to_text: replyTo?.text ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return toAppMessage(data);
}

/**
 * Soft-delete a message (only allowed within 2 hours, enforced by RLS).
 */
export async function deleteMessage(
  messageId: string,
  senderId: string,
): Promise<boolean> {
  const { error } = await supabase
    .from("messages")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", messageId)
    .eq("sender_id", senderId);

  return !error;
}

/**
 * Mark all messages in a conversation as delivered for a given user.
 */
export async function markMessagesDelivered(
  conversationId: string,
  userId: string,
) {
  const now = new Date().toISOString();
  const { error } = await supabase
    .from("messages")
    .update({ delivered_at: now })
    .eq("conversation_id", conversationId)
    .neq("sender_id", userId)
    .is("delivered_at", null);

  if (error) console.warn("markMessagesDelivered error:", error.message);
}

/**
 * Mark all messages in a conversation as read for a given user.
 */
export async function markMessagesRead(
  conversationId: string,
  userId: string,
) {
  const now = new Date().toISOString();
  const { error } = await supabase
    .from("messages")
    .update({ read: true, read_at: now, delivered_at: now })
    .eq("conversation_id", conversationId)
    .neq("sender_id", userId)
    .eq("read", false);

  if (error) console.warn("markMessagesRead error:", error.message);
}

// ─── Push token operations ───────────────────────────────────

export async function savePushToken(
  userId: string,
  token: string,
  platform: "ios" | "android" | "web",
) {
  const { error } = await supabase
    .from("push_tokens")
    .upsert(
      { user_id: userId, token, platform, updated_at: new Date().toISOString() },
      { onConflict: "user_id,token" },
    );

  if (error) console.warn("savePushToken error:", error.message);
}

// ─── Block & Report ─────────────────────────────────────────

export async function blockUser(blockerId: string, blockedId: string) {
  const { error } = await supabase
    .from("blocked_users")
    .upsert(
      { blocker_id: blockerId, blocked_id: blockedId, created_at: new Date().toISOString() },
      { onConflict: "blocker_id,blocked_id" },
    );
  if (error) throw error;
}

export async function unblockUser(blockerId: string, blockedId: string) {
  const { error } = await supabase
    .from("blocked_users")
    .delete()
    .eq("blocker_id", blockerId)
    .eq("blocked_id", blockedId);
  if (error) throw error;
}

export async function getBlockedUsers(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("blocked_users")
    .select("blocked_id")
    .eq("blocker_id", userId);
  if (error) return [];
  return (data ?? []).map((r) => r.blocked_id);
}

export async function reportUser(
  reporterId: string,
  reportedId: string,
  reason: string,
  details?: string,
) {
  const { error } = await supabase
    .from("reports")
    .insert({
      reporter_id: reporterId,
      reported_id: reportedId,
      reason,
      details: details ?? null,
      created_at: new Date().toISOString(),
    });
  if (error) throw error;
}

export async function deleteAccount(userId: string) {
  const { error } = await supabase.rpc("delete_user_account", { target_user_id: userId });
  if (error) throw error;
}

// ─── University data ─────────────────────────────────────────

export async function getUniversities() {
  const { data, error } = await supabase.from("universities").select("*");
  if (error) throw error;
  return data;
}
