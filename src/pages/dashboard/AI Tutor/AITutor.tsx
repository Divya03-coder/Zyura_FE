import { createContext, useState } from "react";
import ChatWindow from "./ChatWindow";
import AiTutorSidebar from "./AiTutorSidebar";
// import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
// import Breadcrumb from "@/components/reusable/CommonBreadcrumb";

// const breadcrumbs: BreadcrumbItem[] = [
//   { name: "Dashboard", link: "/dashboard" },
//   { name: "All Communities", link: "/dashboard/all-communities" },
//   { name: "Create New Discussion", link: "/dashboard/create-new-discussion" },
// ];

export interface Message {
  role: "user" | "ai";
  content: string;
}

export interface ChatContextType {
  currentChatId: string | null;
  setCurrentChatId: (id: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addNewChat: () => void;
}

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

const AITutor = () => {
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const addNewChat = () => {
    setCurrentChatId(null);
  };

  const value: ChatContextType = {
    currentChatId,
    setCurrentChatId,
    searchQuery,
    setSearchQuery,
    addNewChat,
  };

  return (
    <ChatContext.Provider value={value}>
      <div className="flex flex-col bg-gray-100"
      style={{
        height: `calc(100vh - 88px)`,
      }}
      >
      {/* <Breadcrumb breadcrumbs={breadcrumbs} /> */}
        {/* <div className="shrink-0">
        </div> */}
        <div className="flex flex-1 overflow-hidden ">
          <AiTutorSidebar />
          <main className="flex-1 flex flex-col overflow-hidden">
            <ChatWindow />
          </main>
        </div>
      </div>
    </ChatContext.Provider>
  );
};

export default AITutor;
