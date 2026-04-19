-- =============================================================
-- UniFriends Messaging Schema
-- Run this in Supabase SQL Editor (supabase.com → your project → SQL Editor)
-- =============================================================

-- 1. Conversations table
create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  is_group boolean not null default false,
  group_name text,
  created_at timestamptz not null default now()
);

-- 2. Conversation participants (junction table)
create table if not exists conversation_participants (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  joined_at timestamptz not null default now(),
  unique (conversation_id, user_id)
);

-- 3. Messages table
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  text text not null,
  read boolean not null default false,
  -- Reply threading
  reply_to_id uuid references messages(id) on delete set null,
  reply_to_sender_id uuid references auth.users(id) on delete set null,
  reply_to_text text,
  -- Soft delete for "delete within 2 hours" feature
  deleted_at timestamptz,
  created_at timestamptz not null default now()
);

-- 4. Push tokens table (for cross-device notifications)
create table if not exists push_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  token text not null,
  platform text not null check (platform in ('ios', 'android', 'web')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, token)
);

-- =============================================================
-- Indexes for query performance
-- =============================================================

create index if not exists idx_conv_participants_user
  on conversation_participants(user_id);

create index if not exists idx_conv_participants_convo
  on conversation_participants(conversation_id);

create index if not exists idx_messages_conversation
  on messages(conversation_id, created_at);

create index if not exists idx_messages_sender
  on messages(sender_id);

create index if not exists idx_push_tokens_user
  on push_tokens(user_id);

-- =============================================================
-- Row Level Security (RLS)
-- =============================================================

alter table conversations enable row level security;
alter table conversation_participants enable row level security;
alter table messages enable row level security;
alter table push_tokens enable row level security;

-- Conversations: users can only see conversations they're part of
create policy "Users can view their conversations"
  on conversations for select using (
    id in (
      select conversation_id from conversation_participants
      where user_id = auth.uid()
    )
  );

create policy "Users can create conversations"
  on conversations for insert with check (true);

-- Participants: users can see participants of their conversations
create policy "Users can view participants of their conversations"
  on conversation_participants for select using (
    conversation_id in (
      select conversation_id from conversation_participants
      where user_id = auth.uid()
    )
  );

create policy "Users can add participants"
  on conversation_participants for insert with check (true);

-- Messages: users can see messages in their conversations
create policy "Users can view messages in their conversations"
  on messages for select using (
    conversation_id in (
      select conversation_id from conversation_participants
      where user_id = auth.uid()
    )
  );

create policy "Users can send messages to their conversations"
  on messages for insert with check (
    sender_id = auth.uid()
    and conversation_id in (
      select conversation_id from conversation_participants
      where user_id = auth.uid()
    )
  );

create policy "Users can soft-delete their own recent messages"
  on messages for update using (
    sender_id = auth.uid()
    and created_at > now() - interval '2 hours'
  ) with check (
    sender_id = auth.uid()
  );

-- Push tokens: users can only manage their own tokens
create policy "Users can view their own push tokens"
  on push_tokens for select using (user_id = auth.uid());

create policy "Users can insert their own push tokens"
  on push_tokens for insert with check (user_id = auth.uid());

create policy "Users can update their own push tokens"
  on push_tokens for update using (user_id = auth.uid());

create policy "Users can delete their own push tokens"
  on push_tokens for delete using (user_id = auth.uid());

-- =============================================================
-- Enable Realtime for messages table
-- =============================================================

alter publication supabase_realtime add table messages;
