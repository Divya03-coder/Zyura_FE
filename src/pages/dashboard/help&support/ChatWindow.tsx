/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { Send, Paperclip } from "lucide-react";

export default function ChatWindow({ ticket }: any) {
  const [messages, setMessages] = useState(ticket.messages || []);
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage = {
      sender: "user",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setMessageText("");

    // Simulate admin response
    setTimeout(() => {
      const adminResponse = {
        sender: "admin",
        text: "Thanks for your message! We are looking into your issue and will get back to you soon.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev: any) => [...prev, adminResponse]);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg border border-border h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div>
          <h3 className="text-lg text-[#171717] font-semibold">
            {ticket.title}
          </h3>
          <p className="text-sm text-[#737373] font-normal">ID: {ticket.id}</p>
        </div>
        <div className="">
          <div>
            <p className="text-sm font-normal text-[#737373]">Status</p>
            <span className={`py-1 text-sm text-[#171717] font-medium`}>
              {ticket.status}
            </span>
          </div>
          {/* <span className={`px-2 py-1 rounded-full ${ticket.priorityColor}`}>
            {ticket.priority}
          </span> */}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg: any, idx: number) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-primary text-white rounded-br-none"
                  : "bg-gray-100 text-foreground rounded-bl-none"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p
                className={`text-xs mt-1 ${
                  msg.sender === "user"
                    ? "text-blue-100"
                    : "text-muted-foreground"
                }`}
              >
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-border p-4 bg-gray-50">
        <div className="flex gap-2 items-end">
          <button className="p-2 hover:bg-gray-200 rounded-lg transition">
            <Paperclip className="w-5 h-5 text-muted-foreground" />
          </button>
          <input
            type="text"
            placeholder="Type message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            className="p-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
