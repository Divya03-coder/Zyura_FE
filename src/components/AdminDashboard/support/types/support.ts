export interface Message {
  id: string;
  author: string;
  role: "question" | "user" | "support";
  avatar?: string;
  content: string;
  timestamp: string;
}

export interface Ticket {
  id: string;
  subject: string;
  user: string;
  type: "student" | "professional";
  priority: "high" | "medium" | "low";
  status: "open" | "in-progress" | "resolved";
  created: string;
  messages: Message[];
}
