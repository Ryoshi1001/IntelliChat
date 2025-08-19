import assets, { imagesDummyData, messagesDummyData } from "../assets/assets";

const RightSidebar = ({ selectedUser, setSelectedUser }: SidebarProps) => {
  return (
    selectedUser && (
      <div
        className={`rounded-r-2xl relative w-full h-full flex flex-col textlight bg-[#8185b2]/10 overflow-y-scroll
      ${selectedUser ? "max-md:hidden" : ""}
      `}
      >
        {/* user info and bio */}
        <div className="flex flex-shink-0 flex-col items-center pt-16  gap-3 textlight">
          <img
            src={selectedUser.profilePic || assets.avatar_icon}
            alt="profile image"
            className="max-w-20 rounded-full object-cover aspect-[1/1]"
          />
          <div className="flex gap-3 items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <p>{selectedUser.fullName}</p>
          </div>
          <div className="px-10 text-center text-xs">{selectedUser.bio}</div>
        </div>

        {/* border line */}
        <hr className="my-4" />

        {/* media files */}
        <div className="px-4 mb-3 text-xs flex-1 h-full overflow-hidden">
          <p>Media</p>
          <div className="grid pb-14 min-h-full grid-cols-2 overflow-y-scroll max-h-[200px] mt-2 gap-4 opacity-80">
            {imagesDummyData.map((img, index) => (
              <div
                key={index}
                onClick={() => window.open(img)}
                className="cursor-pointer rounded-md"
              >
                <img src={img} alt="img" className="h-full rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* logout */}
        <div className="flex items-center pb-4">
        <button className="bgblue w-[90%] mx-auto opacity-80 py-2 px-8 rounded-full text-[#fff] font-semibold cursor-pointer">
          Logout
        </button>          
        </div>

      </div>
    )
  );
};

export default RightSidebar;
