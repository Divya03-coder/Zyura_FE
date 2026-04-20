// // components/ChatMessages.tsx
// import { Message } from "./AITutor";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

// interface ChatMessagesProps {
//     messages: Message[];
//     lastMessageRef: React.RefObject<HTMLLIElement | null>;
// }

// export default function ChatMessages({ messages, lastMessageRef }: ChatMessagesProps) {
//     if (!messages.length) return null;

//     return (
//         <ul className="space-y-4">
//             {messages.map((msg, index) => (
//                 <li
//                     key={index}
//                     className={`flex ${msg.role === "ai" ? 'justify-start' : 'justify-end'}`}
//                     ref={index === messages.length - 1 ? lastMessageRef : null}
//                 >
//                     <div className={`p-4 rounded-lg ${msg.role === "ai" ? 'bg-white max-w-3xl' : 'bg-[#007BFF1F] text-[#0F151A] max-w-md'}`}>
//                         {msg.role === "ai" ? (
//                             <div className="prose prose-sm max-w-none prose-p:text-gray-800 prose-headings:text-gray-900 prose-strong:text-gray-900 prose-ul:list-disc prose-ol:list-decimal prose-a:text-blue-600">
//                                 <ReactMarkdown remarkPlugins={[remarkGfm]}>
//                                     {msg.content}
//                                 </ReactMarkdown>
//                             </div>
//                         ) : (
//                             <div className="whitespace-pre-wrap">{msg.content}</div>
//                         )}
//                     </div>
//                 </li>
//             ))}
//         </ul>
//     );
// }

// components/ChatMessages.tsx
// import { Message } from "./AITutor";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { useState } from "react";
// import { Copy, Check } from "lucide-react";

// interface ChatMessagesProps {
//   messages: Message[];
//   lastMessageRef: React.RefObject<HTMLLIElement | null>;
// }

// export default function ChatMessages({
//   messages,
//   lastMessageRef,
// }: ChatMessagesProps) {
//   const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

//   if (!messages.length) return null;

//   const handleCopy = async (text: string, index: number) => {
//     await navigator.clipboard.writeText(text);
//     setCopiedIndex(index);
//     setTimeout(() => setCopiedIndex(null), 2000);
//   };

//   return (
//     <ul className="space-y-6 px-4 py-4">
//       {messages.map((msg, index) => (
//         <li
//           key={index}
//           ref={index === messages.length - 1 ? lastMessageRef : null}
//           className={`flex ${
//             msg.role === "ai" ? "justify-start" : "justify-end"
//           }`}
//         >
//           <div
//             className={`relative p-6 rounded-xl shadow-md ${
//               msg.role === "ai"
//                 ? "bg-white max-w-3xl"
//                 : "bg-[#007BFF1F] text-[#0F151A] max-w-md"
//             }`}
//           >
//             {/* Copy Button (AI only) */}
//             {msg.role === "ai" && (
//               <button
//                 onClick={() => handleCopy(msg.content, index)}
//                 className="absolute top-2 right-2 p-1 ml-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition cursor-pointer"
//                 title="Copy response"
//               >
//                 {copiedIndex === index ? (
//                   <Check className="w-4 h-4 text-green-600" />
//                 ) : (
//                   <div className="flex items-center gap-1">
//                     Copy
//                     <Copy className="w-4 h-4" />
//                   </div>
//                 )}
//               </button>
//             )}

//             {/* Message Content */}
//             {msg.role === "ai" ? (
//               <div className="prose prose-sm max-w-none prose-p:text-gray-800 prose-headings:text-gray-900 prose-strong:text-gray-900 prose-ul:list-disc prose-ol:list-decimal prose-a:text-blue-600">
//                 <ReactMarkdown remarkPlugins={[remarkGfm]}>
//                   {msg.content}
//                 </ReactMarkdown>
//               </div>
//             ) : (
//               <div className="whitespace-pre-wrap text-gray-900 font-medium">
//                 {msg.content}
//               </div>
//             )}
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// }

// components/ChatMessages.tsx
import { Message } from "./AITutor";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import CopyableCodeBlock from "@/utils/CopyableCodeBlock";

interface ChatMessagesProps {
  messages: Message[];
  lastMessageRef: React.RefObject<HTMLLIElement | null>;
}

export default function ChatMessages({
  messages,
  lastMessageRef,
}: ChatMessagesProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!messages.length) return null;

  const handleCopy = async (text: string, index: number) => {
    // Convert markdown to plain text for copy
    const tempElement = document.createElement("div");
    tempElement.innerHTML = text
      .replace(/\*\*(.*?)\*\*/g, "$1") // remove bold
      .replace(/###\s+(.*)/g, "$1\n") // heading to new line
      .replace(/\n{2,}/g, "\n"); // extra new lines

    await navigator.clipboard.writeText(tempElement.innerText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <ul className="space-y-6 px-2 py-4">
      {messages.map((msg, index) => (
        <li
          key={index}
          ref={index === messages.length - 1 ? lastMessageRef : null}
          className={`flex ${
            msg.role === "ai" ? "justify-start" : "justify-end"
          }`}
        >
          <div
            className={`relative p-4 rounded-xl shadow-md ${
              msg.role === "ai"
                ? "bg-white max-w-3xl"
                : "bg-[#007BFF1F] text-[#0F151A] max-w-md"
            }`}
          >
            {/* Copy Button (AI only) */}
            {msg.role === "ai" && (
              <button
                onClick={() => handleCopy(msg.content, index)}
                className="absolute top-2 right-2 p-1 ml-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition cursor-pointer"
                title="Copy response"
              >
                {copiedIndex === index ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <button className="flex items-center gap-1 cursor-pointer">
                    Copy
                    <Copy className="w-4 h-4" />
                  </button>
                )}
              </button>
            )}

            {/* Message Content */}
            {msg.role === "ai" ? (
              <div className="prose prose-sm max-w-none prose-p:text-gray-800 prose-headings:text-gray-900 prose-strong:text-gray-900 prose-ul:list-disc prose-ol:list-decimal prose-a:text-blue-600 mt-4">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({
                      inline,
                      className,
                      children,
                    }: {
                      inline?: boolean;
                      className?: string;
                      children?: React.ReactNode;
                    }) {
                      const text = String(children);

                      // 🔹 FORCE inline code if no language is provided
                      if (inline || !className) {
                        return (
                          <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
                            {text}
                          </code>
                        );
                      }

                      // 🔹 Real code block (```js, ```ts etc.)
                      const match = /language-(\w+)/.exec(className);
                      const code = text.replace(/\n$/, "");

                      return (
                        <CopyableCodeBlock code={code} language={match?.[1]} />
                      );
                    },
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="whitespace-pre-wrap text-gray-900 font-medium">
                {msg.content}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
