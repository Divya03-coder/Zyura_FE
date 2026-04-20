// components/Sidebar.tsx
import { useContext, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Loader2,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
} from "lucide-react";
import { ChatContext, ChatContextType } from "./AITutor";
import { useGetThreadTitlesQuery } from "@/store/features/aiTutor/aiTutor.api";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AiTutorSidebar() {
  const {
    addNewChat,
    searchQuery,
    setSearchQuery,
    setCurrentChatId,
    currentChatId,
  } = useContext(ChatContext) as ChatContextType;

  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { data: threadTitles, isLoading } = useGetThreadTitlesQuery();

  // Auto open history when searching
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      setIsHistoryOpen(true);
      if (isCollapsed) setIsCollapsed(false); // Auto expand sidebar on search
    }
  }, [searchQuery, isCollapsed]);

  // Filter threads based on search
  const filteredThreads =
    threadTitles?.filter((thread) =>
      thread.session_title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  // Highlight matched letters
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-300 text-black px-0.5 rounded">
          {part}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  const SidebarItem = ({
    children,
    tooltip,
  }: {
    children: React.ReactNode;
    tooltip: string;
  }) => {
    if (!isCollapsed) return <>{children}</>;

    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent side="right">
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <aside
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } bg-white p-2 border-r border-gray-200 flex flex-col h-full transition-all duration-300 ease-in-out relative`}
    >
      {/* Collapse Toggle Button */}
      {/* <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 h-6 w-6 rounded-full border bg-white shadow-md z-10 hover:bg-gray-100 hidden md:flex"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button> */}

      <div className="flex flex-col mb-4">
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "justify-between"
          } mb-2`}
        >
          {!isCollapsed && (
            <h1 className="text-xl font-semibold text-start text-[#0A0A0A] whitespace-nowrap overflow-hidden">
              Medical AI
            </h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-10 w-10 text-gray-500 hover:text-gray-900 cursor-pointer"
          >
            {isCollapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>
        </div>
        {!isCollapsed && (
          <p className="text-sm text-[#4A5565] font-normal whitespace-nowrap overflow-hidden">
            Your Personalized Learning Companion
          </p>
        )}
      </div>

      <nav className="space-y-4 flex-1 flex flex-col min-h-0">
        {/* New Chat */}
        <SidebarItem tooltip="New Chat">
          <Button
            onClick={addNewChat}
            className={`w-full bg-blue-500 text-white hover:bg-blue-600 transition-all cursor-pointer ${
              isCollapsed ? "px-0 justify-center" : ""
            }`}
          >
            {isCollapsed ? <Plus className="h-5 w-5" /> : "+ New Chat"}
          </Button>
        </SidebarItem>

        {/* Search */}
        {!isCollapsed ? (
          <div>
            <Input
              type="text"
              placeholder="Search chats"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        ) : (
          <div className="flex justify-center">
            <SidebarItem tooltip="Search (Expand to type)">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(false)}
                className="hover:bg-gray-100"
              >
                <Search className="h-4 w-4 text-gray-500" />
              </Button>
            </SidebarItem>
          </div>
        )}

        {/* History Section */}
        <div className="flex-1 flex flex-col min-h-0 rounded-md bg-gray-50">
          {!isCollapsed && (
            <button
              onClick={() => setIsHistoryOpen((prev) => !prev)}
              className="w-full flex justify-between items-center px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 rounded-t-md transition-colors cursor-pointer"
            >
              History
              {isHistoryOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          )}

          {(isHistoryOpen || isCollapsed) && (
            <div className="flex-1 overflow-y-auto thin-scrollbar border-t border-gray-200 custom-scrollbar">
              {isLoading ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                </div>
              ) : filteredThreads.length > 0 ? (
                filteredThreads.map((thread) => (
                  <SidebarItem
                    key={thread.thread_id}
                    tooltip={thread.session_title}
                  >
                    <div
                      onClick={() => setCurrentChatId(thread.thread_id)}
                      className={`cursor-pointer ${
                        isCollapsed ? "justify-center px-2" : "px-3"
                      } py-2 text-sm transition-colors flex items-center gap-2 ${
                        currentChatId === thread.thread_id
                          ? "bg-blue-100 text-blue-800 font-medium"
                          : "text-gray-700 hover:bg-blue-50"
                      }`}
                    >
                      <MessageSquare className="w-4 h-4 shrink-0" />
                      {!isCollapsed && (
                        <span className="truncate">
                          {highlightMatch(thread.session_title, searchQuery)}
                        </span>
                      )}
                    </div>
                  </SidebarItem>
                ))
              ) : (
                !isCollapsed && (
                  <div className="px-3 py-2 text-sm text-gray-400 text-center">
                    No chats found
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
