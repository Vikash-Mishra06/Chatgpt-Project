import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ai from '/ai.svg';

const ChatHeader = ({ sidebarOpen, onToggleSidebar }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data from localStorage or make an API call
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Fallback user data if not available
      setUser({
        fullName: { firstName: 'User', lastName: '' },
        email: 'user@example.com'
      });
    }
  }, []);

  const getUserInitials = () => {
    if (!user) return 'U';
    const firstName = user.fullName?.firstName || user.firstName || '';
    const lastName = user.fullName?.lastName || user.lastName || '';
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || 'U';
  };
  return (
    <div
      className={`backdrop-blur-2xl bg-[#0B0B0D] border-b border-[#3c6e71]/30 !p-4 fixed top-0 z-30 h-20 flex items-center transition-all duration-300 ${sidebarOpen
          ? "left-0 w-full md:left-70 md:w-[calc(100%-280px)]"
          : "left-0 w-full"
        }`}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle */}
          <button
            onClick={onToggleSidebar}
            className="!p-2 hover:bg-[#3c6e71]/20 rounded-lg transition-all"
          >
            <div className="w-5 h-5 flex flex-col justify-center gap-1">
              <div className="w-full h-0.5 bg-gray-200"></div>
              <div className="w-full h-0.5 bg-gray-200"></div>
              <div className="w-full h-0.5 bg-gray-200"></div>
            </div>
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <h1 className="text-xl md:text-2xl uppercase font-bold bg-gradient-to-r from-[#b5ff6d] via-white to-[#b5ff6d] 
  bg-clip-text text-transparent">
              Loura-Ai
            </h1>
            <svg className="h-6 w-6  text-[#b5ff6d]" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V4H8"></path>
              <rect height="12" rx="2" width="16" x="4" y="8"></rect>
              <path d="M2 14h2"></path>
              <path d="M20 14h2"></path>
              <path d="M15 13v2"></path>
              <path d="M9 13v2"></path>
            </svg>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* User Profile Section */}
          <div className="flex items-center gap-3">
            {/* User Avatar with Initials */}
            <div className="w-10 h-10 bg-[#b5ff6d] rounded-full flex items-center justify-center text-black font-semibold text-sm shadow-lg">
              {getUserInitials()}
            </div>

            {/* User Info - Hidden on mobile */}
            <div className="hidden sm:flex flex-col">
              <span className="text-white text-sm font-medium">
                {user?.fullName?.firstName || user?.firstName || 'User'}
              </span>
              
            </div>
          </div>

          {/* AI Status Indicator
          <div className="flex items-center gap-2 text-xs text-gray-400 bg-black/20 px-3 py-2 rounded-full border border-[#3c6e71]/30">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="hidden sm:inline">AI Online</span>
            <span className="sm:hidden">Online</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;