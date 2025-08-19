import { useState } from "react";
import RightSidebar from "../components/RightSidebar";
import SideBar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 sm:py-[8%] sm:px-[3%]">
      <div
        className={`grid grid-cols-1 w-full max-w-7xl h-full border border-[var(--borders)] overflow-hidden  relative rounded-2xl 
          ${selectedUser ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]" : "md:grid-cols-2"}`}
      >
        <SideBar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <ChatArea selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <RightSidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      </div>
    </div>
  );
};

export default Home;
