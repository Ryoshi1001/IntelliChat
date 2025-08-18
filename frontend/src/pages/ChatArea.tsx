import { ArrowBigRight, Info } from "lucide-react";
import { FaLocationArrow } from "react-icons/fa";
import { messagesDummyData } from "../assets/assets";
import formatTime from "../lib/formatTime";

const ChatArea = ({ selectedUser, setSelectedUser }: SidebarProps) => {
  return (
    <div className="flex flex-col w-full h-full p-4">
      {/* header */}
      <div className="flex flex-row items-center justify-between gap-2 border-b border-[var(--borders)]">
        <div className="flex flex-row items-center gap-2 pb-3">
          <img
            src={selectedUser?.profilePic}
            alt="profile image"
            className="w-10 h-10 rounded-full"
          />
          <p className="text-sm">{selectedUser?.fullName}</p>
          <div className="w-4 h-4 bg-green-400 rounded-full"></div>
        </div>

        <Info className="-translate-y-[4px] textlight cursor-pointer" />
      </div>

      {/* chat message container */}
      <div className="flex-1 overflow-y-auto">
        {messagesDummyData.map((user, index) =>
          selectedUser?._id === user?.senderId ? 
          <div key={index} className="relative">
            <div>
            <img src={selectedUser?.profilePic} alt="" className="w-10 h-10"/>
            <span>{formatTime(user.createdAt)}</span>              
            </div>
            <div className="absolute top-0 left-14 bg-blue-400">coins</div>

          </div> 
          : 
          <div>
            
          </div>

        )}
      </div>

      {/* message input */}
      <div className="flex flex-row items-center justify-between gap-3">
        <input
          type="text"
          placeholder="Send a message"
          className="bggray flex-1 rounded-full py-3 px-5 textlight outline-none"
        />
        <div className="bgblue p-2 rounded-full">
          <FaLocationArrow className="w-5 h-5 textlight cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
