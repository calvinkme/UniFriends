/**
 * Supabase Edge Function: push-notification
 *
 * Sends push notifications via the Expo Push API when a new message is inserted.
 *
 * SETUP:
 * 1. Install the Supabase CLI: npm install -g supabase
 * 2. Link your project:   supabase link --project-ref YOUR_PROJECT_REF
 * 3. Deploy this function: supabase functions deploy push-notification
 * 4. Create a database webhook in Supabase Dashboard:
 *    - Go to Database → Webhooks → Create
 *    - Table: messages, Events: INSERT
 *    - Type: Supabase Edge Function
 *    - Function: push-notification
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";

interface WebhookPayload {
  type: "INSERT";
  table: string;
  record: {
    id: string;
    conversation_id: string;
    sender_id: string;
    text: string;
    deleted_at: string | null;
    created_at: string;
  };
  schema: string;
}

type ConversationParticipant = {
  user_id: string;
};

type PushTokenRow = {
  token: string;
};

type SenderProfile = {
  first_name: string;
  last_name: string;
};

Deno.serve(async (req: Request) => {
  try {
    const payload: WebhookPayload = await req.json();
    const message = payload.record;

    // Skip deleted messages
    if (message.deleted_at) {
      return new Response("Skipped deleted message", { status: 200 });
    }

    // Initialize Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Get all participants in this conversation (except the sender)
    const { data: participants } = await supabaseAdmin
      .from("conversation_participants")
      .select("user_id")
      .eq("conversation_id", message.conversation_id)
      .neq("user_id", message.sender_id);

    const recipientRows = (participants ?? []) as ConversationParticipant[];

    if (!recipientRows.length) {
      return new Response("No recipients", { status: 200 });
    }

    const recipientIds = recipientRows.map((participant) => participant.user_id);

    // Get push tokens for all recipients
    const { data: tokens } = await supabaseAdmin
      .from("push_tokens")
      .select("token")
      .in("user_id", recipientIds);

    const pushTokenRows = (tokens ?? []) as PushTokenRow[];

    if (!pushTokenRows.length) {
      return new Response("No push tokens found", { status: 200 });
    }

    // Get sender profile for the notification title
    const { data: senderProfile } = await supabaseAdmin
      .from("profiles")
      .select("first_name, last_name")
      .eq("id", message.sender_id)
      .single();

    const sender = senderProfile as SenderProfile | null;

    const senderName = sender
      ? `${sender.first_name} ${sender.last_name}`
      : "Someone";

    // Send push notifications via Expo Push API
    const pushMessages = pushTokenRows.map((tokenRow) => ({
      to: tokenRow.token,
      title: senderName,
      body: message.text.length > 100 ? message.text.slice(0, 100) + "..." : message.text,
      data: {
        type: "message",
        conversationId: message.conversation_id,
      },
      sound: "default",
      channelId: "messages",
    }));

    const pushResponse = await fetch(EXPO_PUSH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pushMessages),
    });

    const result = await pushResponse.json();

    return new Response(JSON.stringify({ sent: pushMessages.length, result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Push notification error:", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
