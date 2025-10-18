import React from 'react';
import ai from '/ai.svg';
import AnimatedBtn from '../AnimatedBtn/AnimatedBtn';
import FormattedMessage from './FormattedMessage';
import LottieAnimation from '../LottieAnimation/LottieAnimation';
import robotAnimation from '../../assets/lottie.json';

const MessageArea = ({
  sidebarOpen,
  currentChatId,
  messages,
  isTyping,
  messagesEndRef,
  onNewChat
}) => {
  return (
    <div
      className={`fixed overflow-y-auto bg-[#0B0B0D] !p-4 !space-y-4 custom-scrollbar transition-all duration-300 ${
        sidebarOpen
          ? "left-0 right-0 w-full md:left-[320px] md:w-[calc(100%-320px)]"
          : "left-0 right-0 w-full"
      }`}
      style={{
        top: "80px",
        bottom: "80px",
        height: "calc(100vh - 140px)",
      }}
    >
      {!currentChatId ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="!mb-6 ">
            <svg className="h-12 w-12  text-[#b5ff6d]" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V4H8"></path>
              <rect height="12" rx="2" width="16" x="4" y="8"></rect>
              <path d="M2 14h2"></path>
              <path d="M20 14h2"></path>
              <path d="M15 13v2"></path>
              <path d="M9 13v2"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white !mb-4">
            Welcome to <span className='bg-gradient-to-r from-[#b5ff6d] via-white to-[#b5ff6d] 
  bg-clip-text text-transparent'>Loura-Ai</span>
          </h2>
          <p className="text-lg text-gray-400 !mb-6 max-w-md">
            Your intelligent AI companion is ready to help. Create a new
            chat to get started!
          </p>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`flex flex-col w-full sm:w-auto max-w-[85vw] sm:max-w-xs md:max-w-md lg:max-w-xl xl:max-w-2xl !p-4 rounded-2xl shadow-lg transition-all duration-300 ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-[#b5ff6d] to-[#b5ff6d] text-black font-semibold"
                    : "backdrop-blur-2xl bg-black/30 border border-[#b5ff6d]/30 text-white"
                }`}
              >
                {message.sender === "Loura" && (
                  <div className="flex items-center  gap-2 !mb-2">
                    <svg className="h-6 w-6  text-[#b5ff6d]" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8V4H8"></path>
                      <rect height="12" rx="2" width="16" x="4" y="8"></rect>
                      <path d="M2 14h2"></path>
                      <path d="M20 14h2"></path>
                      <path d="M15 13v2"></path>
                      <path d="M9 13v2"></path>
                    </svg>
                    <span className="text-xs text-gray-200 font-semibold">
                      Loura-Ai
                    </span>
                  </div>
                )}
                <FormattedMessage message={message} />
                <span className="text-xs opacity-70 !mt-2 block">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="backdrop-blur-2xl bg-black/30 border border-[#b5ff6d]/30 !p-4 rounded-2xl w-full sm:w-auto max-w-[85vw] sm:max-w-xs">
                <div className="flex items-center gap-2 !mb-2">
                  <svg className="h-6 w-6  text-[#b5ff6d]" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8V4H8"></path>
                    <rect height="12" rx="2" width="16" x="4" y="8"></rect>
                    <path d="M2 14h2"></path>
                    <path d="M20 14h2"></path>
                    <path d="M15 13v2"></path>
                    <path d="M9 13v2"></path>
                  </svg>
                  <span className="text-xs text-gray-200 font-semibold">
                    Loura-Ai
                  </span>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#b5ff6d] rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-[#b5ff6d] rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-[#b5ff6d] rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};

export default MessageArea;