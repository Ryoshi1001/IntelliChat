import { useNavigate } from "react-router-dom";
import assets, { userDummyData } from "../assets/assets";
import { HiDotsHorizontal } from "react-icons/hi";
import { Search } from "lucide-react";

interface SidebarProps {
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Sidebar = ({ selectedUser, setSelectedUser }: SidebarProps) => {
  const navigate = useNavigate();

  return (
    <div className={`
      bg-[#8185b2]/10 px-4 rounded-r-xl flex h-full w-full flex-col overflow-hidden 
      ${selectedUser ? "max-md:hidden" : ""}
    `}>
      <div className="pb-2 flex-shrink-0">
        <div className="flex flex-row items-start justify-between">
          <img src={assets.logo} alt="logo" className="max-w-24" />
          <div className="relative text-[#fff] pt-3 group">
            <HiDotsHorizontal className="w-8 h-8 cursor-pointer text-[var(--textgray)] mr-3 hover:text-[var(--textdark)]" />
            <div className="absolute hidden group-hover:block top-full right-2 bgdark py-3 px-4 z-10 rounded-sm">
              <div onClick={() => navigate("/profile")} className="hover:text-[var(--logoblue)] cursor-pointer text-nowrap">Edit Profile</div>
              <hr className="my-1" />
              <div className="cursor-pointer hover:text-[var(--logoblue)]">Logout</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-shrink-0 flex-row gap-2 bggray text-[#fff] rounded-full px-2 py-1">
        <Search className="w-7 h-7" />
        <input value={""} placeholder="Search here" type="text" className="flex-1 outline-none placeholder:text-[var(--textlight)]" />
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-3 pb-96 my-4">
        {userDummyData.map((user, index) => (
          <div
            key={index}
            onClick={() => setSelectedUser(user)}
            className={`flex flex-row p-2 pl-4 items-center justify-between cursor-pointer rounded
              ${selectedUser?._id === user._id ? "bglight" : ""}
            `}
          >
            <div className="flex items-center gap-3">
              <img src={user?.profilePic} alt="profile image" className="w-10 h-10 rounded-full" />
              <div className="flex flex-col">
                <span>{user?.fullName || assets.avatar_icon}</span>
                {index < 3 ? (
                  <span className="text-sm text-green-400">Online</span>
                ) : (
                  <span className="text-sm textgray">Offline</span>
                )}
              </div>
            </div>
            <div className="bgblue p-3 rounded-full w-5 h-5 flex items-center justify-center textlight">{index}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar; 