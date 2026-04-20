import type { ChatUser, Message } from "./types";

export const demoUsers: ChatUser[] = [ 
    {
    id: "1",
    name: "Isabella",
    avatar: "/api/placeholder/32/32",
    status: "online",
    lastSeen: " 01:25 pm",
    userType: "individual",
  },
  {
    id: "2",
    name: "Dr Elina Harrison",
    avatar: "/api/placeholder/32/32",
    status: "online",
    lastSeen: " 01:25 pm",
    userType: "mentor",
  },
  {
    id: "3",
    name: "Isabella",
    avatar: "/api/placeholder/32/32",
    status: "offline",
    lastSeen: " 01:25 pm",
    userType: "individual",
  },
  {
    id: "4",
    name: "General Discussion",
    avatar: "/api/placeholder/32/32",
    status: "offline",
    lastSeen: "2 hrs ago",
    isGroup: true,
    memberCount: 1247,
    lastMessage: " 02:34 am",
    userType: "group",
  },
  {
    id: "5",
    name: "Study Group - Cardiology",
    avatar: "/api/placeholder/32/32",
    status: "offline",
    lastSeen: "2 hrs ago",
    isGroup: true,
    memberCount: 156,
    lastMessage: " 02:38 am",
    userType: "group",
  },
  {
    id: "6",
    name: "Dr. Sarah Martinez",
    avatar: "/api/placeholder/32/32",
    status: "online",
    lastSeen: " 03:54 pm",
    userType: "mentor",
  },
  {
    id: "7",
    name: "Prof. Michael Chen",
    avatar: "/api/placeholder/32/32",
    status: "offline",
    lastSeen: " 12:34 pm",
    userType: "mentor",
  },
 ];
export const demoMessages: Message[] = [ 
    {
    id: "1",
    userId: "1",
    userName: "Sarah Chen",
    userAvatar: "/api/placeholder/32/32",
    content:
      "Hi everyone! I'm struggling with understanding cardiac output calculations. Can anyone help to explain?",
    timestamp: "10:30 AM",
    likes: 4,
    replies: 5,
  },
  {
    id: "2",
    userId: "2",
    userName: "Dr. Rodriguez",
    userAvatar: "/api/placeholder/32/32",
    content:
      "Cardiac Output = Heart Rate × Stroke Volume. It's the amount of blood pumped by the heart per minute. For a normal adult, it's about 5L/min.",
    timestamp: "10:32 AM",
    likes: 4,
    replies: 5,
    isReplyTo: "Sarah Chen",
    replyContent:
      "Replying to: Hi everyone! I'm struggling with understanding car...",
    hasExplanation: true,
    explanationText:
      "This explanation covers the basics well! Cardiac output factors that affect cardiac output.",
  },
  {
    id: "3",
    userId: "3",
    userName: "Alex Thompson",
    userAvatar: "/api/placeholder/32/32",
    content:
      "That's super helpful! Are there any good mnemonics for remembering the factors that affect stroke volume?",
    timestamp: "10:35 AM",
    likes: 0,
    replies: 0,
    isReplyTo: "Dr. Rodriguez",
    replyContent:
      "Replying to: Cardiac Output = Heart Rate × StrokeVolume. It's...",
    hasExplanation: true,
    explanationText:
      "This explanation covers the basics well! Cardiac output factors that affect cardiac output.",
  },
];
