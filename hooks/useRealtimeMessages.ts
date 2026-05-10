import { useEffect, useRef } from "react";
import { supabase } from "@/services/supabase";
import { useConnectionStore } from "@/stores";
import { useAuthStore } from "@/stores";
import type { DbMessage, Message, MessageStatus } from "@/types";
import type { RealtimeChannel } from "@supabase/supabase-js";

function deriveStatus(row: DbMessage): MessageStatus {
  if (row.read_at) return "read";
  if (row.delivered_at) return "delivered";
  return "sent";
}

/** Convert a Supabase Realtime payload into the app's Message type. */
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
 * Subscribe to Realtime message events for a specific conversation.
 * Handles INSERT (new messages) and UPDATE (soft deletes / read receipts / status changes).
 */
export function useRealtimeMessages(conversationId: string | null) {
  const channelRef = useRef<RealtimeChannel | null>(null);
  const { addRealtimeMessage, removeRealtimeMessage, updateMessageStatus, useSupabase } = useConnectionStore();
  const session = useAuthStore((s) => s.session);

  useEffect(() => {
    if (!conversationId || !useSupabase || !session) return;

    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const row = payload.new as DbMessage;
          if (row.deleted_at) return;
          const msg = toAppMessage(row);
          addRealtimeMessage(conversationId, msg);
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const row = payload.new as DbMessage;
          if (row.deleted_at) {
            removeRealtimeMessage(conversationId, row.id);
            return;
          }
          updateMessageStatus(conversationId, row.id, deriveStatus(row), row.delivered_at, row.read_at);
        },
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      channel.unsubscribe();
      channelRef.current = null;
    };
  }, [conversationId, useSupabase, session]);
}

/**
 * Subscribe to Realtime messages across ALL conversations for the current user.
 * Used at the app level to show notifications for messages in other chats.
 */
export function useRealtimeAllMessages() {
  const channelRef = useRef<RealtimeChannel | null>(null);
  const { addRealtimeMessage, useSupabase, conversations, activeConversationId } =
    useConnectionStore();
  const session = useAuthStore((s) => s.session);

  useEffect(() => {
    if (!useSupabase || !session) return;

    const channel = supabase
      .channel("messages:all")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const row = payload.new as DbMessage;
          if (row.deleted_at) return;

          // Only process messages for conversations we're part of
          const isOurConvo = conversations.some((c) => c.id === row.conversation_id);
          if (!isOurConvo) return;

          // Skip if this is the active conversation (per-conversation hook handles it)
          if (row.conversation_id === activeConversationId) return;

          const msg = toAppMessage(row);
          addRealtimeMessage(row.conversation_id, msg);
        },
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      channel.unsubscribe();
      channelRef.current = null;
    };
  }, [useSupabase, session, conversations, activeConversationId]);
}
