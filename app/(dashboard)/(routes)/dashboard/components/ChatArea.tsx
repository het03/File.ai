import React from "react";

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatHistoryProps {
  messages: Message[];
  className?: string; // Add className as an optional prop
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, className }) => {
  return (
    <div
      className={`chat-history ${className} flex flex-col space-y-2 p-4 overflow-y-auto`}
    >
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message p-2 rounded-lg max-w-xs ${
            message.isUser
              ? "bg-blue-500 text-white self-end"
              : "bg-gray-200 text-black self-start"
          }`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
