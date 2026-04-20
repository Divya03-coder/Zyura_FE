import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EllipsisVertical, Mails, Phone, Video } from "lucide-react";
import { useState } from "react";

export default function GroupMessageSection() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<
    { text: string; sender: "me" | "other"; user?: string }[]
  >([
    {
      text: "Don't forget to review today's mock OSCE case on respiratory distress.",
      sender: "other",
      user: "Dr. Miah",
    },
    {
      text: "Make sure to prepare the CVS exam sequence as well.",
      sender: "other",
      user: "Dr. Silva",
    },
  ]);

  const handleMessageSend = () => {
    if (!inputValue.trim()) return;
    setMessages([...messages, { text: inputValue, sender: "me" }]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleMessageSend();
    }
  };

  return (
    <div className="border border-slate-300 rounded-[12px] p-5 flex flex-col h-[600px]">
      {/* message heading */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <div className="flex items-center gap-1">
          <Mails />
          <p className="font-medium">Group Message</p>
        </div>
        <div className="flex items-center gap-7">
          <Phone />
          <Video />
          <EllipsisVertical />
        </div>
      </div>

      {/* users messages */}
      <div className="flex-1 overflow-y-auto mt-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "other" && (
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                alt="user profile"
                className="w-8 h-8 rounded-full"
              />
            )}
            <div className="max-w-[70%]">
              <p
                className={`text-sm p-3 rounded-[8px] ${
                  msg.sender === "me"
                    ? "bg-blue-500 text-white"
                    : "bg-[#EFF6FF] text-[#111827]"
                }`}
              >
                {msg.text}
              </p>
              {msg.sender === "other" && (
                <p className="text-xs text-[#6B7280] pl-1">
                  {msg.user} • 2 hours ago
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* input section */}
      <div className="flex items-center space-x-2 p-4 border-t border-gray-200">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 h-12"
        />
        <Button
          onClick={handleMessageSend}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Send
        </Button>
      </div>
    </div>
  );
}
