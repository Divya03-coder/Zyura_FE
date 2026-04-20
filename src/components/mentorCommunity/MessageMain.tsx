import React from "react";
import { ThumbsUp, MessageSquare, Users, User, Send, ChevronLeft } from "lucide-react";
import { ChatUser, Message } from "../message/types";

interface ChatMainProps {
  messages: Message[];
  activeUser: ChatUser | undefined;
  onBack?: () => void;
}

const MessageMain: React.FC<ChatMainProps> = ({
  messages,
  activeUser,
  onBack,
}) => {
  const getHeaderTitle = () => {
    if (!activeUser) return "General Discussion";
    if (activeUser.userType === "group") return activeUser.name;
    if (activeUser.userType === "mentor") return activeUser.name;
    return `${activeUser.name}`;
  };

  const getHeaderSubtitle = () => {
    if (!activeUser) return "Online";
    if (activeUser.userType === "group")
      return `${activeUser.memberCount} members`;
    return activeUser.status === "online"
      ? "Online"
      : `Last seen ${activeUser.lastSeen}`;
  };
  return (
   <div className="flex flex-col h-full bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
      {/* Header (fixed) */}
      <div className="bg-white p-4 flex items-center flex-shrink-0 rounded-t-lg overflow-hidden">
        {onBack && (
          <button
            className="md:hidden mr-1 sm:mr-3 text-gray-600"
            onClick={onBack}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        <div className="flex items-center flex-1">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
            {activeUser?.userType === "group" ? (
              <Users className="w-5 h-5 text-gray-600" />
            ) : activeUser?.userType === "mentor" ? (
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">Dr</span>
              </div>
            ) : (
              <User className="w-5 h-5 text-gray-600" />
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-[.80rem] sm:text-lg font-semibold text-gray-900 text-nowrap">
              {getHeaderTitle()}
            </h2>
            <p className="text-[.75rem] sm:text-sm text-gray-500">
              {getHeaderSubtitle()}
            </p>
          </div>
          {activeUser?.status === "online" && (
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          )}
        </div>
      </div>

      {/* Messages (scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="bg-white rounded-lg p-4 shadow-sm">
            {message.isReplyTo && (
              <div className="mb-3 p-2 bg-gray-50 rounded text-sm text-[#717182]">
                <span className="font-medium">
                  Replying to: {message.isReplyTo}
                </span>
                <p className="truncate">{message.replyContent}</p>
              </div>
            )}
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 sm:w-8 sm:h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-medium">
                  {message.userName.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 text-nowrap sm:text-base">
                    {message.userName}
                  </span>
                  <span className="text-[.6rem] sm:text-sm text-gray-500 text-nowrap">
                    {message.timestamp}
                  </span>
                  {/* <MoreHorizontal className="w-4 h-4 text-gray-400" /> */}
                </div>
              </div>
            </div>
            <div className="mb-3">
              <p className="text-gray-800 bg-[#ECECF0] p-2 rounded">
                {message.content}
              </p>
            </div>
            {message.hasExplanation && (
              <div className="mb-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-sm text-yellow-800">
                  {message.explanationText}
                </p>
              </div>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <button className="flex items-center gap-1 hover:text-blue-600">
                <ThumbsUp className="w-4 h-4" /> <span>{message.likes}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-blue-600">
                <MessageSquare className="w-4 h-4" />{" "}
                <span>{message.replies}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Input (fixed at bottom) */}
      <div className="bg-white items-center border-t border-gray-200 p-4 flex-shrink-0 rounded-b-lg">
        <div className="flex items-center gap-2 sm:gap-3">
          <textarea
            placeholder={`Type your message${
              activeUser ? ` to ${activeUser.name}` : ""
            }...`}
            className="flex-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm resize-none"
          />
          <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MessageMain