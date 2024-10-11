import React from "react";

interface ChatCardProps {
  sender: "human" | "ai";
  message: string;
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
        {isAI ? "AI" : "Human"}
      </div>
      <div className="mt-2 inline-block bg-gray-100 p-2 rounded-lg">
        {message}
      </div>
    </div>
  );
};
