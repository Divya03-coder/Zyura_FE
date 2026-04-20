import React from "react";
import { Users, User, Send, ChevronLeft } from "lucide-react";
import {
  useGetGroupMessagesQuery,
  useSendGroupMessageMutation,
} from "@/store/features/group/groupApi";
import type { Message, ChatUser } from "./types";
import GroupInfoModal from "./GroupInfoModal";
import { useState } from "react";

interface ChatMainProps {
  messages: Message[];
  activeUser: ChatUser | undefined;
  onBack?: () => void;
}

const ChatMain: React.FC<ChatMainProps> = ({
  messages: initialMessages,
  activeUser,
  onBack,
}) => {
  const [messageText, setMessageText] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [isGroupInfoOpen, setIsGroupInfoOpen] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Group Messages Hook
  const { data: groupMessagesData } = useGetGroupMessagesQuery(
    {
      groupId: activeUser?.id || activeUser?._id,
      page: 1,
      limit: 30,
    },
    {
      skip: activeUser?.userType !== "group",
      refetchOnMountOrArgChange: true,
    }
  );

  // Use activeUser directly for header info as it comes from the sidebar list
  const liveActiveGroup = activeUser;
  console.log("ChatMain: liveActiveGroup", liveActiveGroup);

  const [sendGroupMessage, { isLoading }] = useSendGroupMessageMutation();

  // Determine which messages to show
  const displayMessages =
    activeUser?.userType === "group"
      ? groupMessagesData?.data || [] // Updated to use .data based on network response
      : initialMessages;

  const getHeaderTitle = () => {
    if (!liveActiveGroup) return "General Discussion";
    if (liveActiveGroup.userType === "group")
      return liveActiveGroup.name || liveActiveGroup.groupName;
    if (liveActiveGroup.userType === "mentor") return liveActiveGroup.name;
    return `${liveActiveGroup.name}`;
  };

  const getHeaderSubtitle = () => {
    if (!liveActiveGroup) return "Online";
    if (liveActiveGroup.userType === "group")
      return `${
        liveActiveGroup.memberCount || liveActiveGroup.groupMembers?.length || 0
      } members`;
    return liveActiveGroup.status === "online"
      ? "Online"
      : `Last seen ${liveActiveGroup.lastSeen}`;
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() && !file) return;

    if (activeUser?.userType === "group") {
      const formData = new FormData();

      // Construct the data objects as requested: body: file and data: { ... }
      const payloadData = {
        groupId: activeUser?.id || activeUser?._id,
        message: messageText,
        // reply: "..." // Add reply logic later if needed
      };

      formData.append("data", JSON.stringify(payloadData));

      if (file) {
        formData.append("file", file);
      }

      try {
        await sendGroupMessage(formData).unwrap();
        setMessageText("");
        setFile(null);
      } catch (error) {
        console.error("Failed to send message", error);
        // toast.error("Failed to send message"); // Assuming toast is available or use alert
      }
    } else {
      // Handle direct message (not implemented yet)
      console.log("Direct message sending not implemented locally");
    }
  };

  // Auto-scroll to bottom on new messages
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayMessages]);

  return (
    <div className="flex flex-col h-full bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
      {/* Header (fixed) */}
      <div className="bg-white p-4 flex items-center flex-shrink-0 rounded-t-lg overflow-hidden border-b border-gray-200">
        {onBack && (
          <button
            className="md:hidden mr-1 sm:mr-3 text-gray-600"
            onClick={onBack}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        <div
          className={`flex items-center flex-1 ${
            activeUser?.userType === "group"
              ? "cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors"
              : ""
          }`}
          onClick={() =>
            activeUser?.userType === "group" && setIsGroupInfoOpen(true)
          }
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3 overflow-hidden">
            {liveActiveGroup?.userType === "group" &&
            liveActiveGroup.groupLogo ? (
              <img
                src={liveActiveGroup.groupLogo}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : liveActiveGroup?.userType === "group" ? (
              <Users className="w-5 h-5 text-gray-600" />
            ) : liveActiveGroup?.userType === "mentor" ? (
              <div className="w-full h-full bg-blue-500 flex items-center justify-center">
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
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {displayMessages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-400">
            No messages yet. Start the conversation!
          </div>
        ) : (
          // Messages typically come newest first from API, reverse to show oldest at top
          [...displayMessages].reverse().map((message: any) => {
            const isGroupMsg = activeUser?.userType === "group";

            const msgId = isGroupMsg ? message?._id : message.id;

            // Map fields based on API response structure
            const senderName = isGroupMsg
              ? message.senderId?.profile_id?.firstName ||
                message.senderId?.profile_id?.name ||
                "Unknown"
              : message.userName;

            const senderPhoto = isGroupMsg
              ? message.senderId?.profile_id?.profilePhoto ||
                message.senderId?.profile_id?.profileImg
              : message.userAvatar;

            const content = isGroupMsg ? message.message : message.content;

            // Map file fields from API
            const fileUrl = isGroupMsg ? message.file?.fileUrl : null;
            const fileName = isGroupMsg ? message.file?.fileName : null;

            const time = isGroupMsg
              ? new Date(message.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : message.timestamp;

            return (
              <div key={msgId} className="bg-white rounded-lg p-4 shadow-sm">
                {/* Reply handling omitted for brevity/simplicity unless required */}

                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3 overflow-hidden">
                    {senderPhoto ? (
                      <img
                        src={senderPhoto}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-600 text-sm font-medium">
                        {senderName?.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 text-nowrap sm:text-base">
                        {senderName}
                      </span>
                      <span className="text-[.6rem] sm:text-sm text-gray-500 text-nowrap">
                        {time}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-2">
                  <p className="text-gray-800 bg-[#ECECF0] p-2 rounded inline-block">
                    {content}
                  </p>
                </div>

                {fileUrl && (
                  <div className="mb-2">
                    {/* Check if image */}
                    {fileName?.match(/\.(jpeg|jpg|png|gif)$/i) ||
                    fileUrl.match(/\.(jpeg|jpg|png|gif)/i) ? (
                      <img
                        src={fileUrl}
                        alt="attachment"
                        className="max-w-xs rounded border"
                      />
                    ) : (
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-blue-600 underline bg-blue-50 p-2 rounded max-w-xs"
                      >
                        <span className="truncate">
                          {fileName || "Attachment"}
                        </span>
                      </a>
                    )}
                  </div>
                )}

                {/* Reactions - optional/demo */}
                {/* <div className="flex items-center gap-4 text-sm text-gray-500">
                      <button className="flex items-center gap-1 hover:text-blue-600">
                        <ThumbsUp className="w-4 h-4" /> <span>0</span>
                      </button>
                    </div> */}
              </div>
            );
          })
        )}
      </div>

      {/* Input (fixed at bottom) */}
      <div className="bg-white items-center border-t border-gray-200 p-4 flex-shrink-0 rounded-b-lg">
        {file && (
          <div className="flex items-center justify-between bg-gray-100 p-2 mb-2 rounded">
            <span className="text-sm truncate max-w-[200px]">{file.name}</span>
            <button
              onClick={() => setFile(null)}
              className="text-red-500 hover:text-red-700"
            >
              &times;
            </button>
          </div>
        )}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* File Upload Button */}
          <label className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) setFile(e.target.files[0]);
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </label>

          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder={`Type your message${
              activeUser ? ` to ${activeUser.name || activeUser.groupName}` : ""
            }...`}
            className="flex-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm resize-none"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={(!messageText.trim() && !file) || isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <GroupInfoModal
        isOpen={isGroupInfoOpen}
        onClose={() => setIsGroupInfoOpen(false)}
        group={liveActiveGroup}
      />
    </div>
  );
};

export default ChatMain;
