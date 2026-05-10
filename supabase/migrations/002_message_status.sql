-- =============================================================
-- Add message delivery & read status tracking
-- Run this in Supabase SQL Editor after 001_messaging.sql
-- =============================================================

-- Add delivered_at and read_at columns to messages table
alter table messages add column if not exists delivered_at timestamptz;
alter table messages add column if not exists read_at timestamptz;

-- Index for efficient unread/undelivered lookups
create index if not exists idx_messages_delivered
  on messages(conversation_id) where delivered_at is null;

create index if not exists idx_messages_read_at
  on messages(conversation_id) where read_at is null;

-- Update the existing RLS policy to allow recipients to mark messages as delivered/read
-- (The existing update policy only allows sender to soft-delete their own messages)
create policy "Recipients can mark messages as delivered or read"
  on messages for update using (
    -- User must be a participant of the conversation
    conversation_id in (
      select conversation_id from conversation_participants
      where user_id = auth.uid()
    )
    -- Cannot update own messages' delivery status
    and sender_id != auth.uid()
  ) with check (
    sender_id != auth.uid()
  );
