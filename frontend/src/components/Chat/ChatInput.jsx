import AnimatedBtn from "../AnimatedBtn/AnimatedBtn";

const ChatInput = ({
  sidebarOpen,
  inputMessage,
  setInputMessage,
  onSendMessage,
  isTyping,
}) => {
  return (
    <form
      onSubmit={onSendMessage}
      className={`fixed bottom-0 z-30 transition-all duration-300 backdrop-blur-2xl bg-[#0B0B0D] border-t border-[#3c6e71]/30 !p-2 sm:!p-4
        ${sidebarOpen 
          ? "left-0 right-0 w-full md:left-70 md:w-[calc(100%-280px)]" 
          : "left-0 right-0 w-full"
        }`}
    >
      <div className="flex gap-2 sm:gap-3 items-center">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message ..."
          className="flex-1 min-w-0 !px-3 sm:!px-4 !py-2 sm:!py-2 bg-[#0B0B0D] border border-[#b5ff6d] rounded-xl text-white placeholder-gray-400 focus:border-[#b5ff6d] focus:outline-none  transition-all text-sm sm:text-base h-10 sm:h-12"
          disabled={isTyping}
        />
        <AnimatedBtn
          type="submit"
          disabled={!inputMessage.trim() || isTyping}
          className="!mt-0 !px-3 sm:!px-4 !py-2 sm:!py-2 flex-shrink-0"
        >
          {isTyping ? "..." : "Send"}
        </AnimatedBtn>
      </div>
    </form>
  );
};

export default ChatInput;
