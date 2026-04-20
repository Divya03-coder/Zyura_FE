import React, { useState } from "react";
import ChatSidebar from "@/components/message/ChatSidebar";
import ChatMain from "@/components/message/ChatMain";
import { demoUsers, demoMessages } from "@/components/message/demoData";

const Messages: React.FC = () => {
  const [activeUser, setActiveUser] = useState<any>(demoUsers[0]);
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="h-[calc(100vh-200px)]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        {/* Sidebar */}
        <div
          className={`bg-white border border-gray-200 rounded-lg flex flex-col h-full min-h-0 ${
            showChat ? "hidden md:flex" : "flex"
          }`}
        >
          <div className="flex-1 min-h-0 overflow-y-auto">
            <ChatSidebar
              users={demoUsers}
              activeUserId={activeUser?.id || activeUser?._id}
              onUserSelect={(user) => {
                setActiveUser(user);
                setShowChat(true);
              }}
            />
          </div>
        </div>

        {/* Chat */}
        <div
          className={`shadow-x flex flex-col h-full md:col-span-2 min-h-0 ${
            showChat ? "flex" : "hidden md:flex"
          }`}
        >
          <ChatMain
            messages={demoMessages} // This is generally ignored for groups now in ChatMain
            activeUser={activeUser}
            onBack={() => setShowChat(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Messages;
