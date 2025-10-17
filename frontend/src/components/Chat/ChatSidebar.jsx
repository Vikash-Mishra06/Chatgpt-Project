import React from "react";
import ai from "/ai.svg";
import AnimatedBtn from "../AnimatedBtn/AnimatedBtn";

const ChatSidebar = ({
  sidebarOpen,
  chatHistory,
  onNewChat,
  onSelectChat,
  onLogout,
  formatTime,
}) => {
  return (
    <div
      className={`${
        sidebarOpen ? "w-70" : "w-0"
      } transition-all duration-300 overflow-hidden backdrop-blur-2xl bg-[#0B0B0D] border-r border-[#3c6e71]/30 fixed left-0 top-0 h-full z-20`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="!p-4 !pb-6 border-b border-[#3c6e71]/30">
  <div className="flex items-center justify-between gap-3">
    {/* Logo + Text */}
    <div className="flex items-center gap-2">
      <svg
        className="h-6 w-6 text-[#b5ff6d]"
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 8V4H8"></path>
        <rect height="12" rx="2" width="16" x="4" y="8"></rect>
        <path d="M2 14h2"></path>
        <path d="M20 14h2"></path>
        <path d="M15 13v2"></path>
        <path d="M9 13v2"></path>
      </svg>

      <h2 className="text-lg font-bold text-gray-200">Loura-Ai</h2>
    </div>

    {/* New Chat Button */}
    <AnimatedBtn onClick={onNewChat}>New Chat</AnimatedBtn>
  </div>
</div>


        {/* Chat History */}
        <div className="flex-1 overflow-y-auto !p-4 !pt-4 !pb-2 sidebar-scrollbar">
          {chatHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center !p-4">
              <div className="text-4xl !mb-4">💬</div>
              <h3 className="text-lg font-semibold text-white !mb-2">
                No chats yet
              </h3>
              <p className="text-sm text-gray-300 !mb-4">
                Create your first chat to start talking with Nova AI
              </p>
              <button
                onClick={onNewChat}
                className="text-sm text-[#b5ff6d] transition-colors"
              >
                + Create your first chat
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => onSelectChat(chat.id)}
                  className={`!p-3 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 relative ${
                    chat.isActive
                      ? "border-1 border-[#b5ff6d] shadow-lg "
                      : "hover:bg-black/30 border border-transparent"
                  }`}
                >
                  {chat.isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl "></div>
                  )}
                  <div className="flex justify-between items-start !mb-1">
                    <h3 className={`text-sm font-semibold truncate ${
                      chat.isActive ? "text-[#b5ff6d]" : "text-white"
                    }`}>
                      {chat.title}
                    </h3>
                    <span className="text-xs text-gray-500 ml-2">
                      {formatTime(chat.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="!p-4 !pb-20 md:!pb-7 lg:!pb-6 border-t border-[#3c6e71]/30">
          <div className="w-full flex justify-center">
            <AnimatedBtn onClick={onLogout}>Logout</AnimatedBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
