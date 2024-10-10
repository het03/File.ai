"use client";
import {
  Menu,
  X,
  Plus,
  Ellipsis,
  SquareArrowOutUpRight,
  Pencil,
  Trash2,
  Paperclip,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { ChatCard } from "./components/Card"; // Import the ChatCard component
import { UserButton } from "@clerk/nextjs";

interface Chat {
  id: number;
  name: string;
}

interface Message {
  id: number;
  sender: "human" | "ai";
  content: string;
}

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chats, setChats] = useState<Chat[]>([]); // State to hold list of chats
  const [nextChatId, setNextChatId] = useState(1); // State to manage unique chat IDs
  const [menuOpen, setMenuOpen] = useState<number | null>(null); // Track which chat menu is open
  const [renamingChatId, setRenamingChatId] = useState<number | null>(null); // Track which chat is being renamed
  const [renamingChatName, setRenamingChatName] = useState<string>("");

  // Change this state to map chat IDs to their messages
  const [messagesByChatId, setMessagesByChatId] = useState<{
    [key: number]: Message[];
  }>({});
  const [activeChatId, setActiveChatId] = useState<number | null>(null); // Track the currently selected chat
  const [inputMessage, setInputMessage] = useState(""); // State to manage the input box

  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Ref for scrolling

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMenu = (chatId: number) => {
    setMenuOpen(menuOpen === chatId ? null : chatId); // Toggle the menu for a specific chat
  };

  const handleAddChat = () => {
    const newChat: Chat = { id: nextChatId, name: `Chat ${nextChatId}` };
    setChats([...chats, newChat]); // Add new chat to the chat list
    setMessagesByChatId({ ...messagesByChatId, [nextChatId]: [] }); // Initialize messages for the new chat
    setActiveChatId(newChat.id); // Set the new chat as active
    setNextChatId(nextChatId + 1); // Increment chat ID for the next chat
  };

  const handleDeleteChat = (chatId: number) => {
    setChats(chats.filter((chat) => chat.id !== chatId)); // Remove the chat from the list
    const newMessages = { ...messagesByChatId };
    delete newMessages[chatId]; // Remove messages for the deleted chat
    setMessagesByChatId(newMessages);
    if (activeChatId === chatId) {
      setActiveChatId(null); // Reset active chat if it was deleted
    }
  };

  const handleRenameChat = (chatId: number) => {
    setRenamingChatId(chatId);
    const chat = chats.find((chat) => chat.id === chatId);
    if (chat) setRenamingChatName(chat.name);
  };

  const handleRenameSubmit = (chatId: number) => {
    setChats(
      chats.map((chat) =>
        chat.id === chatId ? { ...chat, name: renamingChatName } : chat
      )
    );
    setRenamingChatId(null); // Reset renaming state after renaming
  };

  const handleShareChat = (chatId: number) => {
    // Logic to share the chat (e.g., copy link to clipboard, etc.)
    alert(`Share link for Chat ${chatId}`);
  };

  // Ref to detect clicks outside the dropdown
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown menu if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Function to handle scrolling to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to handle message submission
  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return; // No input
    let currentChatId = activeChatId;

    // Create a new chat if there's no active chat
    if (currentChatId === null) {
      const newChat: Chat = { id: nextChatId, name: `Chat ${nextChatId}` };
      setChats([...chats, newChat]);
      setMessagesByChatId({ ...messagesByChatId, [nextChatId]: [] });
      currentChatId = newChat.id; // Update to new chat id
      setActiveChatId(currentChatId); // Set as active
      setNextChatId(nextChatId + 1);
    }

    // User's message
    const newMessage: Message = {
      id: Date.now(),
      sender: "human",
      content: inputMessage,
    };

    // Update messages for the active chat
    setMessagesByChatId((prev) => ({
      ...prev,
      [currentChatId]: [...(prev[currentChatId] || []), newMessage],
    }));

    setInputMessage(""); // Clear the input box

    // AI response logic...
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the uploaded file
    if (!activeChatId) {
      alert("Please select a chat first.");
      return; // Ensure there is an active chat before proceeding
    }

    if (file && file.type === "application/pdf") {
      const newMessage: Message = {
        id: Date.now(), // Use timestamp as a unique ID
        sender: "human",
        content: `Uploaded a PDF: ${file.name}`, // Message content indicating file upload
      };

      // Update messages for the active chat
      setMessagesByChatId((prev) => ({
        ...prev,
        [activeChatId]: [...(prev[activeChatId] || []), newMessage],
      }));

      // Clear the input after uploading
      setInputMessage("");

      // Prepare to upload the file
      const formData = new FormData();
      formData.append("file", file);

      // Assuming you have an endpoint to handle file uploads
      fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("File upload failed");
          }
          return response.json();
        })
        .then((data) => {
          console.log("File uploaded successfully", data);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  // Function to handle chat selection
  const handleChatSelect = (chatId: number) => {
    setActiveChatId(chatId); // Set the active chat ID
    scrollToBottom(); // Scroll to the bottom of the messages
  };

  return (
    <div className="h-screen grid grid-cols-[auto_1fr]">
      {/* Sidebar */}
      <div className="relative w-full flex flex-col">
        {/* Button to toggle the sidebar */}
        <button
          type="button"
          onClick={toggleSidebar}
          aria-controls="drawer-navigation"
          aria-expanded={isSidebarOpen}
          className="text-gray-600 hover:text-gray-800 focus:outline-none p-4"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Sidebar */}
        <div
          id="drawer-navigation"
          className={`fixed top-0 left-0 w-64 h-screen bg-[#0e0e0e] text-white transition-transform duration-300 z-50 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4">
            <UserButton />
            <h1 className="text-xl font-semibold">Chats</h1>
            {/* Button to close the sidebar */}
            <button
              type="button"
              onClick={toggleSidebar}
              aria-label="Close sidebar"
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* List of Chats */}
          <div className="p-4 flex-1 overflow-y-auto space-y-2 max-h-[calc(100vh-150px)]">
            {chats.length === 0 ? (
              <p>No chats available</p>
            ) : (
              <ul>
                {chats.map((chat) => (
                  <li
                    key={chat.id}
                    className={`flex justify-between items-center p-2 hover:bg-[#202020] rounded cursor-pointer ${
                      activeChatId === chat.id ? "bg-[#303030]" : ""
                    }`}
                    onClick={() => handleChatSelect(chat.id)} // Change active chat on click
                  >
                    {renamingChatId === chat.id ? (
                      <input
                        value={renamingChatName}
                        onChange={(e) => setRenamingChatName(e.target.value)}
                        onBlur={() => handleRenameSubmit(chat.id)} // Save on blur
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleRenameSubmit(chat.id); // Save on Enter
                        }}
                        className="text-white p-1 rounded bg-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <span>{chat.name}</span>
                    )}

                    {/* 3-Dot Menu for Options */}
                    <div className="flex" ref={dropdownRef}>
                      <button
                        onClick={() => toggleMenu(chat.id)}
                        className="text-gray-400 hover:text-white focus:outline-none"
                      >
                        <Ellipsis className="w-5 h-5" />
                      </button>
                      {menuOpen === chat.id && (
                        <div className="absolute right-0 mt-2 w-32 bg-[#252323] text-white rounded-xl shadow-lg">
                          <button
                            onClick={() => handleShareChat(chat.id)}
                            className="flex items-center justify-center gap-2 py-2 w-full text-m hover:bg-[#303030] text-left rounded-xl"
                          >
                            <SquareArrowOutUpRight className="w-4 h-4" />
                            Share
                          </button>
                          <button
                            onClick={() => handleRenameChat(chat.id)}
                            className="flex items-center justify-center gap-2 py-2 w-full text-m hover:bg-[#303030] text-left rounded-xl"
                          >
                            <Pencil className="w-4 h-4" />
                            Rename
                          </button>
                          <button
                            onClick={() => handleDeleteChat(chat.id)}
                            className="flex items-center justify-center gap-2 py-2 w-full text-m text-red-700 hover:bg-[#303030] text-left rounded-xl"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Button to Add Chat */}
          <div className="fixed bottom-0 left-0 w-full p-4 flex justify-center">
            <button
              onClick={handleAddChat}
              className="flex items-center justify-center gap-2 py-2 px-12 text-white bg-blue-500 rounded hover:bg-blue-600 w-max"
            >
              <Plus className="w-4 h-4" />
              New Chat
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Chat Area */}
      <div
        className={`h-full p-4 bg-white transition-all duration-300 z-40 ${
          isSidebarOpen ? "ml-48" : "ml-0"
        }`}
      >
        <div className="grid place-items-center text-3xl font-semibold text-center">
          File.ai
        </div>

        {/* Chat content */}
        <div className="flex flex-col h-[calc(100vh-150px)]">
          <div className="flex-1 overflow-y-auto space-y-4">
            {activeChatId !== null && messagesByChatId[activeChatId]
              ? messagesByChatId[activeChatId].map((message) => (
                  <ChatCard
                    key={message.id}
                    sender={message.sender}
                    message={message.content}
                  />
                ))
              : activeChatId === null}
            <div ref={messagesEndRef} /> {/* This empty div is for scrolling */}
          </div>
          {/* Message Input Box */}
          <div className="fixed bottom-4 left-0 right-0 flex justify-center p-6 z-40">
            <div className="flex items-center w-full max-w-2xl border rounded-full">
              <label htmlFor="file-upload" className="p-2 cursor-pointer">
                <Paperclip className="w-5 h-5 text-gray-600" />
                <input
                  id="file-upload"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileUpload} // Function to handle file uploads
                  className="hidden" // Hide the actual file input
                />
              </label>
              <input
                type="text"
                className="w-full p-2 text-black rounded-l-full focus:outline-none"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage(); // Send message on Enter
                }}
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 text-white bg-blue-500 rounded-r-full hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
