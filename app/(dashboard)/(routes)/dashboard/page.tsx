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
  pdfName?: string | null;
}

interface Message {
  id: number;
  sender: "human" | "ai";
  content: string;
}

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]); // State to hold list of chats
  const [nextChatId, setNextChatId] = useState(1); // State to manage unique chat IDs
  const [menuOpen, setMenuOpen] = useState<number | null>(null); // Track which chat menu is open
  const [renamingChatId, setRenamingChatId] = useState<number | null>(null); // Track which chat is being renamed
  const [renamingChatName, setRenamingChatName] = useState<string>("");
  const [pdfName, setPdfName] = useState<string | null>(null);

  // Change this state to map chat IDs to their messages
  const [messagesByChatId, setMessagesByChatId] = useState<{
    [key: number]: Message[];
  }>({});
  const [activeChatId, setActiveChatId] = useState<number | null>(null); // Track the currently selected chat
  const [inputMessage, setInputMessage] = useState(""); // State to manage the input box

  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Ref for scrolling

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      const newChat: Chat = {
        id: nextChatId,
        name: `Chat ${nextChatId}`,
        pdfName: pdfName,
      };
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

    // Show loading state for AI response
    const loadingMessage: Message = {
      id: Date.now() + 1, // Unique ID for loading message
      sender: "ai",
      content: "AI is thinking...",
    };
    setMessagesByChatId((prev) => ({
      ...prev,
      [currentChatId]: [...(prev[currentChatId] || []), loadingMessage],
    }));

    try {
      // Call your LLM API
      const response = await fetch(`api/ask_pdf/${pdfName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: newMessage.content }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const aiResponse: Message = {
        id: Date.now() + 2, // Unique ID for AI response message
        sender: "ai",
        content: data.answer, // Assuming the response contains an AI-generated reply in 'data.response'
      };
      console.log(data);

      // Update message list with AI's response, replacing the loading message
      setMessagesByChatId((prev) => ({
        ...prev,
        [currentChatId]: prev[currentChatId].map((msg) =>
          msg.id === loadingMessage.id ? aiResponse : msg
        ),
      }));
    } catch (error) {
      console.error("Error getting AI response:", error);

      // Prepare an error message to display
      const errorMessage: Message = {
        id: Date.now() + 3, // Unique ID for the error message
        sender: "ai",
        content: "Error getting AI response. Please try again.",
      };

      // Update message list with error message, replacing the loading message
      setMessagesByChatId((prev) => ({
        ...prev,
        [currentChatId]: prev[currentChatId].map((msg) =>
          msg.id === loadingMessage.id ? errorMessage : msg
        ),
      }));
    }

    // Scroll to the bottom of the chat after the message has been sent
    scrollToBottom();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    // Check if a file was selected
    if (file && file.type === "application/pdf") {
      setPdfName(file.name); // Store the pdfName
      // Create a new message object for the uploaded PDF
      const newMessage: Message = {
        id: Date.now(), // Use timestamp as a unique ID
        sender: "human",
        content: `Uploaded a PDF: ${file.name}`, // Message content indicating file upload
      };

      // Check if a chat already exists with the PDF name
      const existingChat = chats.find((chat) => chat.name === file.name);

      if (existingChat) {
        // If the chat exists, upload the PDF to the existing chat
        setMessagesByChatId((prev) => ({
          ...prev,
          [existingChat.id]: [...(prev[existingChat.id] || []), newMessage],
        }));
        setActiveChatId(existingChat.id); // Switch to the existing chat
      } else {
        // If the chat doesn't exist, create a new chat
        const newChatId = chats.length + 1; // Generate a new chat ID
        const newChat = {
          id: newChatId,
          name: file.name, // Use the PDF name as the chat name
          pdfName: file.name, // Store pdfName in chat
        };

        // Update the chat list with the new chat
        setChats((prev) => [...prev, newChat]);

        // Initialize messages for the new chat
        setMessagesByChatId((prev) => ({
          ...prev,
          [newChatId]: [newMessage],
        }));

        // Set the active chat to the newly created chat
        setActiveChatId(newChatId);
      }

      // Clear the input after uploading
      setInputMessage("");

      // Prepare to upload the file
      const formData = new FormData();
      formData.append("file", file);

      // Assuming you have an endpoint to handle file uploads
      fetch("/api/pdf", {
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
      <div className="relative w-full h-fit flex flex-col z-50">
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
                      <span className="truncate">{chat.name}</span> // Apply the truncate class here
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
        className={`h-full bg-white transition-all duration-300 z-40 ${
          isSidebarOpen ? "ml-48" : "ml-0"
        }`}
      >
        <div className="fixed top-2 left-0 right-0 z-40 flex justify-between items-center">
          <div className="flex-grow text-center text-3xl font-semibold sm:text-[1.5rem]">
            File.ai
          </div>
          <div className="px-4 py-1">
            <UserButton />
          </div>
        </div>
        {/* Chat content */}
        <div className="flex flex-col h-[calc(100vh-130px)] mt-12">
          {/* Added margin-top here */}
          <div className="flex-1 overflow-y-auto">
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
          <div className="fixed left-0 right-0 flex justify-center p-6 z-40 bottom-2 lg:bottom-4">
            <div className="flex items-end w-full max-w-2xl border rounded-3xl p-2 bg-white">
              {/* File Upload Button */}
              <label
                htmlFor="file-upload"
                className="p-2 cursor-pointer flex-shrink-0"
              >
                <Paperclip className="w-5 h-5 text-gray-600" />
                <input
                  id="file-upload"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileUpload} // Handle file upload
                  className="hidden" // Hide the actual file input
                />
              </label>

              {/* Text Area for Input */}
              <textarea
                className="w-full p-2 text-black focus:outline-none resize-none bg-transparent"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Upload file and ask..."
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (e.shiftKey) {
                      e.preventDefault(); // Prevent the default Enter behavior (adding a new line)
                      setInputMessage((prev) => prev + "\n"); // Add a new line explicitly
                    } else {
                      e.preventDefault(); // Prevent the default Enter key behavior
                      handleSendMessage(); // Send the message
                    }
                  }
                }}
                style={{ minHeight: "40px", maxHeight: "200px" }} // Define min and max height (up to 10 lines)
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement; // Type assertion
                  target.style.height = "auto"; // Reset height to auto to calculate new height
                  target.style.height = `${Math.min(
                    target.scrollHeight,
                    200
                  )}px`; // Adjust height dynamically up to 200px (~10 lines)
                }}
              />
              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 text-white font-bold bg-blue-500 rounded-full hover:bg-blue-600 ml-2 flex-shrink-0"
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
