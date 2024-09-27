import React from "react";

interface Message {
  text: string;
  isUser: boolean;
}

interface Chat {
  name: string;
  messages: Message[];
}

interface SidebarProps {
  chats: Chat[];
  activeChat: number;
  onSelectChat: (index: number) => void;
  onNewChat: () => void;
  isOpen: boolean; // New prop for controlling visibility
  onClose: () => void; // New prop to close the sidebar
}

const Sidebar: React.FC<SidebarProps> = ({
  chats,
  activeChat,
  onSelectChat,
  onNewChat,
  isOpen,
  onClose,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 p-4 md:p-6 flex flex-col transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:relative md:translate-x-0 md:w-64 w-1/2`} // Adjust for large screens
    >
      <button onClick={onClose} className="mb-4 text-gray-500 md:hidden">
        Close
      </button>
      <div className="font-semibold mb-6 text-xl md:text-2xl">History</div>
      <div className="space-y-4 flex-grow overflow-y-auto">
        {chats.map((chat, index) => (
          <div
            key={index}
            onClick={() => onSelectChat(index)}
            className={`p-2 rounded cursor-pointer hover:bg-gray-200 ${
              activeChat === index ? "bg-gray-300" : ""
            }`}
          >
            <p className="font-semibold">{chat.name}</p>
            <p className="text-sm text-gray-600 truncate">
              {chat.messages[0]?.text || "No messages yet"}
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={onNewChat}
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
      >
        New Chat
      </button>
    </div>
  );
};

export default Sidebar;
