"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import ChatHistory from "./components/ChatArea";
import InputField from "./components/PrompArea";
import Sidebar from "./components/ChatHistory";
import { CircleHelp, Link2, StarIcon, TriangleAlert, Zap } from "lucide-react";

interface Message {
  text: string;
  isUser: boolean;
}

interface Chat {
  name: string;
  messages: Message[];
  pdfName: string;
}

const Dashboard: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([
    { name: "Chat 1", messages: [], pdfName: "" },
  ]);
  const [activeChat, setActiveChat] = useState<number>(0);
  const [isChatActive, setIsChatActive] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleSend = async (message: string) => {
    const updatedChats = [...chats];
    const pdfName = updatedChats[activeChat].pdfName; 
    updatedChats[activeChat].messages.push({ text: message, isUser: true });
    setChats(updatedChats);
    setIsChatActive(true);
  
    try {
      const response = await fetch(`api/ask_pdf/${pdfName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: message }), 
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log(result.answer);
      updatedChats[activeChat].messages.push({ text: result.answer, isUser: false });
      setChats(updatedChats);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };
  

  const handleFileUpload = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response: Response = await fetch("/api/pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload file. Status: ${response.status}`);
      }

      const result: { message: string } = await response.json();

      const updatedChats: Chat[] = [...chats];
      updatedChats[activeChat].messages.push({
        text: `PDF uploaded: ${file.name}`,
        isUser: false,
      });

      updatedChats[activeChat].pdfName = file.name; // Store the PDF name

      setChats(updatedChats);
      setIsChatActive(true);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error uploading file:", error.message);
        const updatedChats: Chat[] = [...chats];
        updatedChats[activeChat].messages.push({
          text: `Error uploading file: ${error.message}`,
          isUser: false,
        });
        setChats(updatedChats);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  const handleSelectChat = (index: number) => {
    setActiveChat(index);
    setIsChatActive(chats[index].messages.length > 0);
  };

  const handleNewChat = () => {
    const newChat: Chat = { name: `Chat ${chats.length + 1}`, messages: [], pdfName: "" };
    setChats([...chats, newChat]);
    setActiveChat(chats.length);
    setIsChatActive(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        chats={chats}
        activeChat={activeChat}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col h-screen">
        {/* Top Navigation */}
        <div className="relative">
          <div className="flex items-center justify-between p-4 md:px-8 bg-white border-b border-gray-200">
            {/* Hamburger Icon */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>

            {/* Right Section */}
            <div className={`flex items-center gap-4 md:gap-8`}>
              <button className="text-yellow-600 font-medium flex items-center gap-1">
                Upgrade Plan <Zap className="h-4 w-4" />
              </button>
              <button className="text-gray-500 flex items-center gap-1">
                Help <CircleHelp className="h-4 w-4" />
              </button>
              <button className="text-gray-500 flex items-center gap-1">
                API <Link2 className="h-4 w-4" />
              </button>
              <UserButton />
            </div>
          </div>
        </div>

        {/* Main Section */}
        <div className="flex-grow flex flex-col justify-between p-4 md:p-16 bg-white">
          {!isChatActive ? (
            <>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">File.ai</h1>
              <p className="text-gray-500 mb-8">Ver 1.0 Aug</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                {/* Capabilities Section */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-3 p-6 border rounded-lg items-start">
                    <StarIcon className="w-6 h-6 text-gray-400" />
                    <h2 className="font-bold text-lg">Capabilities</h2>
                    <h4 className="text-gray-500">
                      Remembers what user said earlier in the conversation
                    </h4>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="p-6 border rounded-lg text-gray-500">
                      Allows users to provide follow-up corrections
                    </div>
                    <div className="p-6 border rounded-lg text-gray-500">
                      Trained to decline inappropriate requests
                    </div>
                  </div>
                </div>

                {/* Limitations Section */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-3 p-6 border rounded-lg items-start">
                    <TriangleAlert className="w-6 h-6 text-gray-400" />
                    <h2 className="font-bold text-lg">Limitations</h2>
                    <h4 className="text-gray-500">
                      May occasionally generate incorrect information
                    </h4>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="p-6 border rounded-lg text-gray-500">
                      May occasionally produce harmful instructions or biases
                    </div>
                    <div className="p-6 border rounded-lg text-gray-500">
                      Limited knowledge of world and events after 2021
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-grow flex flex-col justify-between w-full">
    <ChatHistory
      messages={chats[activeChat].messages}
      className="flex-grow"
    />
            </div>
          )}
        </div>

        {/* Chat Input Area */}
    <div className="p-4 md:p-8 bg-white">
      <InputField onSend={handleSend} onFileUpload={handleFileUpload} />
    </div>
      </div>
    </div>
  );
};

export default Dashboard;
