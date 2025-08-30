import { useContext } from "react";
import RightSidebar from "../components/RightSidebar";
import SideBar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";
import { ChatContext } from "../../context/ChatContext";

const Home = () => {
  const {selectedUser} = useContext(ChatContext)!;

  return (
    <div className="min-h-screen bg-primary relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle animated gradients for depth */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-500/10 via-cyan-400/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tl from-indigo-500/8 via-blue-600/4 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-600/3 via-cyan-500/3 to-indigo-600/3 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern overlay for subtle texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
        backgroundSize: '20px 20px'
      }}></div>

      {/* Main Container */}
      <div className="flex flex-col items-center justify-center h-screen p-4 sm:py-[4%] sm:px-[3%] relative z-10">
        <div
          className={`grid grid-cols-1 w-full max-w-7xl h-full chat-container overflow-hidden relative rounded-2xl shadow-2xl backdrop-blur-sm transition-all duration-500 ease-out
            ${selectedUser ? "md:grid-cols-[300px_1fr_280px] xl:grid-cols-[320px_1fr_300px]" : "md:grid-cols-[300px_1fr] xl:grid-cols-[320px_1fr]"}`}
        >
          {/* Left Sidebar - User List */}
          <div className="relative bg-surface-primary/50 backdrop-blur-md border-r border-primary overflow-hidden">
            {/* Sidebar header glow */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
            <SideBar />
          </div>

          {/* Center - Chat Area */}
          <div className="relative bg-secondary/30 backdrop-blur-sm overflow-hidden flex flex-col">
            {/* Chat header glow */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
            <ChatArea />
            
            {/* Chat area bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent"></div>
          </div>

          {/* Right Sidebar - User Profile/Info */}
          {selectedUser && (
            <div className="relative bg-surface-primary/50 backdrop-blur-md border-l border-primary overflow-hidden slide-up">
              {/* Right sidebar header glow */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
              <RightSidebar />
            </div>
          )}
        </div>

        {/* Floating UI Elements */}
        {/* Connection status indicator */}
        <div className="absolute bottom-6 left-6 glass-card px-4 py-2 flex items-center gap-2 fade-in">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-secondary">Connected</span>
        </div>

        {/* Settings/Help button */}
        <div className="absolute bottom-6 right-6 flex gap-3">
          <button className="glass-card p-3 hover:glass-card-hover transition-all duration-300 rounded-full group">
            <svg className="w-5 h-5 text-accent group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <button className="glass-card p-3 hover:glass-card-hover transition-all duration-300 rounded-full group">
            <svg className="w-5 h-5 text-accent group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        {/* App version indicator (top right) */}
        <div className="absolute max-sm:hidden top-6 right-6 glass-card px-3 py-1 fade-in">
          <span className="text-xs text-muted">v2.1.0</span>
        </div>

        {/* Logo watermark (top left) */}
        <div className="absolute top-6 left-6 opacity-30 hover:opacity-60 transition-opacity duration-300">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
        </div>
      </div>

    </div>
  );
};

export default Home;
