export interface ChatUser {
  id: string;
  _id?: string;
  name: string;
  avatar: string;
  status: "online" | "offline";
  lastSeen: string;
  isGroup?: boolean;
  memberCount?: number;
  groupMembers?: any[];
  groupName?: string;
  groupLogo?: string;
  lastMessage?: string;
  timeAgo?: string;
  userType: "individual" | "group" | "mentor" | "student";
}

export interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  isReplyTo?: string;
  replyContent?: string;
  hasExplanation?: boolean;
  explanationText?: string;
}
