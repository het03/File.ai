import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
interface ChatCardProps {
  sender: "You" | "ai";
  message: string; // Assume LLM returns message in a Markdown-like format
}

export const ChatCard: React.FC<ChatCardProps> = ({ sender, message }) => {
  const isAI = sender === "ai";

  return (
    <div
      className={`pr-12 mb-4 lg:px-14 lg:py-4 ${
        isAI ? "text-left" : "text-right"
      }`}
    >
      <div
        className={`text-sm font-semibold ${
          isAI ? "text-blue-700" : "text-gray-700"
        }`}
      >
        {isAI ? "AI" : "You"}
      </div>

      <div className="mt-2 inline-block bg-gray-100 p-4 rounded-lg text-sm max-w-2xl">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{message}</ReactMarkdown>
      </div>
    </div>
  );
};
