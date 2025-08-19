import { ArrowRight, Image, Info } from "lucide-react";
import assets, { messagesDummyData } from "../assets/assets";
import formatTime from "../lib/formatTime";
import { useEffect, useRef } from "react";
import { FaLocationArrow } from "react-icons/fa";

const ChatArea = ({ selectedUser, setSelectedUser }: SidebarProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return selectedUser ? (
    <div className="flex flex-col w-full h-full p-4 overflow-scroll relative backdrop-blur-lg">
      {/* header for chat container */}
      <div className="flex flex-row items-center justify-between gap-2 border-b border-[var(--borders)]">
        <div className="flex flex-row items-center gap-2 pb-3">
          <img
            src={assets.profile_martin}cd
            alt="profile image"
            className="w-10 h-10 rounded-full"
          />
          <p className="text-sm">Martin Johnson</p>
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        </div>
        <ArrowRight
          onClick={() => setSelectedUser(null)}
          className="md:hidden max-w-7 cursor-pointer"
        />
        <Info className="-translate-y-[4px] textlight cursor-pointer max-md:hidden max-w-5" />
      </div>

      {/* chat area */}
      <div className="flex flex-col p-3 pb-4 overflow-scroll">
        {messagesDummyData.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 justify-end
          ${msg.senderId !== "680f50e4f10f3cd28382ecf9" && "flex-row-reverse"}`}
          >
            {/* if msg is image or text */}
            {msg.image ? (
              <img
                src={msg.image}
                alt=""
                className="max-w-[230px] rounded-lg border border-[var(--borders)] overflow-hidden mb-8"
              />
            ) : (
              <p
                className={`
                p-2 bggray textlight font-light rounded-lg mb-8 md:text-sm break-all max-w-[200px]
                ${
                  msg.senderId === "680f50e4f10f3cd28382ecf9"
                    ? "rounded-br-none"
                    : "rounded-bl-none"
                }
                `}
              >
                {msg.text}
              </p>
            )}
            <div className="text-xs text-center">
              <img
                src={
                  msg.senderId === "680f50e4f10f3cd28382ecf9"
                    ? assets.avatar_icon
                    : assets.profile_martin
                }
                alt="avatar icon"
                className="w-8 h-8 rounded-full"
              />
              {/* message timestamp */}
              <p className="pt-1">{formatTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}

        <div ref={scrollRef}></div>
      </div>

      {/* create message */}
      <div className="flex flex-row items-center justify-between gap-3">
        <div className="flex bggray items-center rounded-full w-full textlight py-3 px-5">
          <input
            type="text"
            placeholder="Send a message"
            className="flex-1 outline-none placeholder:text-[var(--textblue)]"
          />
          <input type="file" id="image" accept="image/png, image/jpg" hidden />
          <label htmlFor="image">
            <Image className=" max-w-7 cursor-pointer textlight" />
          </label>
        </div>
        <div className="bgblue p-2 rounded-full">
          <FaLocationArrow className="w-5 h-5 textlight cursor-pointer" />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 bg-white/10 max-md:hidden">
      <img src={assets.logo} alt="" className="max-w-16" />
      <p className="font-medium text-lg textlight">Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatArea;
