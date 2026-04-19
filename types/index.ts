export type University = {
  id: string;
  name: string;
  degrees: string[];
};

export type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  avatarUrl: string;
  university: string;
  degree: string;
  majors: string[];
  age: number;
  academicYear: 1 | 2 | 3 | 4;
  gpaRanking?: string;
  activeCourses: string[];
  bio: string;
  interests: string[];
  isVerified: boolean;
  isOnline: boolean;
  createdAt: string;
};

export type ConnectionStatus = "pending" | "accepted" | "rejected";
export type ConnectionDirection = "incoming" | "outgoing" | "matched";

export type Connection = {
  id: string;
  user: UserProfile;
  status: ConnectionStatus;
  direction?: ConnectionDirection;
  compatibilityScore: number;
  lastMessage?: string;
  lastMessageTime?: string;
  unread: boolean;
  createdAt: string;
};

export type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
  deletedAt?: string | null;
  replyTo?: {
    id: string;
    senderId: string;
    text: string;
  };
};

export type Conversation = {
  id: string;
  participantIds: string[];
  isGroup: boolean;
  groupName?: string;
  messages: Message[];
  createdAt: string;
};

/** Row shape returned by the Supabase `messages` table */
export type DbMessage = {
  id: string;
  conversation_id: string;
  sender_id: string;
  text: string;
  read: boolean;
  reply_to_id: string | null;
  reply_to_sender_id: string | null;
  reply_to_text: string | null;
  deleted_at: string | null;
  created_at: string;
};

/** Row shape returned by the Supabase `conversations` table */
export type DbConversation = {
  id: string;
  is_group: boolean;
  group_name: string | null;
  created_at: string;
};

/** Row shape for conversation_participants */
export type DbConversationParticipant = {
  id: string;
  conversation_id: string;
  user_id: string;
  joined_at: string;
};

export type ScoredProfile = UserProfile & { compatibilityScore: number };

export type FilterState = {
  fieldOfStudy: string | null;
  academicYear: number | null;
  interests: string[];
  proximityKm: number;
};

export type Group = {
  id: string;
  name: string;
  members: UserProfile[];
  messages: Message[];
  createdAt: string;
};
