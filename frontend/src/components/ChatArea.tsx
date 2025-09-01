import { ArrowRight, Image, Info } from "lucide-react";
import assets from "../assets/assets";
import formatTime from "../lib/formatTime";
import { useContext, useEffect, useRef, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import AiAssistModal from "./AiAssistModal";

const ChatArea = () => {
  const {
    messages,
    selectedUser,
    setSelectedUser,
    sendMessage,
    getMessages,
    generateMessage,
    setGeneratedMessage,
    generatedMessage,
  } = useContext(ChatContext)!;
  const { authUser, onlineUsers } = useContext(AuthContext)!;
  const [showModal, setShowModal] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [input, setInput] = useState("");

  console.log("showmodal: ", showModal);

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollRef.current && messages) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleGenerateMessage = async () => {
    try {
      const receivedMessages = messages
        .filter((message) => message.senderId === selectedUser?._id)
        .slice(-10);
      const sentMessages = messages
        .filter((message) => message.senderId === authUser?._id)
        .slice(-10);

      const receivedTexts = receivedMessages
        .map((message) => message.text)
        .join("\n");

      const sentTexts = sentMessages.map((message) => message.text).join("\n");
      console.log("receivedTexts: ", receivedTexts);
      console.log("sentTexts: ", sentTexts);

      const prompt = `
This is a chat conversation between two people.

The "Received" messages are what the sender said originally.  
The "Sent" messages are the replies back to those received messages.

Review both sets of messages to understand the context and topic of the conversation.  
Now generate a meaningful, relevant reply **only on behalf of the sender of the Sent messages** based on the full conversation.

Do not refer to yourself as AI or the system.  
Make the reply human-like, clear, and appropriate for the ongoing conversation.

Received messages:
${receivedTexts}

Sent messages:
${sentTexts}
`;

      await generateMessage(prompt);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // handle send message
  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    if (input.trim() === "") return null;
    // trim clear space before or after text
    await sendMessage({ text: input.trim() });
    setInput("");
  };

  // Add this function in your ChatArea component
  const handleSendGeneratedMessage = async () => {
    if (!generatedMessage) return;

    // Set the generated message as input
    setInput(String(generatedMessage));

    // Send the message using your existing sendMessage function
    await sendMessage({ text: String(generatedMessage).trim() });

    // Close modal and clear input
    setInput("");
    setGeneratedMessage("");
    setShowModal(false);
  };

  // function for sending image in chat
  const handleSendImage = async (e: any) => {
    const file = e.target.files[0];
    console.log("file inm handlesendimage chatarea: ", file);
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select an image file");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };

    reader.readAsDataURL(file);
  };

  return selectedUser ? (
    <div className="flex flex-col w-full h-full p-4 overflow-scroll relative backdrop-blur-lg">
      <button
        onClick={() => {
          handleGenerateMessage();
          setShowModal(true);
        }}
        type="submit"
        className="btn-primary mb-3 py-2! px-6 text-base font-semibold transition-all duration-300 rounded-full flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.95] focus:outline-none focus:ring-4 focus:ring-accent-primary"
      >
        <img
          src="/logo.png"
          alt="AI Chat Logo"
          className="w-14 h-auto opacity-90 drop-shadow-2xl"
        />
        Chat Assist
      </button>

      <AiAssistModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        generatedMessage={generatedMessage}
        onSendMessage={handleSendGeneratedMessage}
      />

      {/* header for chat container */}
      <div className="flex flex-row items-center justify-between gap-2 border-b border-[var(--borders)]">
        <div className="flex flex-row items-center gap-2 pb-3">
          <img
            src={selectedUser.profilePic || assets.avatar_icon}
            alt="profile image"
            className="w-10 h-10 rounded-full"
          />
          <p className="text-sm">{selectedUser.fullName}</p>
          {onlineUsers.includes(selectedUser._id) && (
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          )}
        </div>
        <ArrowRight
          onClick={() => setSelectedUser(null)}
          className="md:hidden max-w-7 cursor-pointer"
        />
        <Info className="-translate-y-[4px] textlight cursor-pointer max-md:hidden max-w-5" />
      </div>

      {/* chat area */}
      <div className="flex flex-col p-3 pb-4 overflow-scroll">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 justify-end
          ${msg.senderId !== authUser?._id && "flex-row-reverse"}`}
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
                  msg.senderId === authUser?._id
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
                  msg.senderId === authUser?._id
                    ? authUser?.profilePic || assets.avatar_icon
                    : selectedUser?.profilePic || assets.avatar_icon
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
      <div className="flex flex-row items-center justify-between gap-3 mt-1">
        <div className="flex bggray items-center rounded-full w-full textlight py-3 px-5">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage(e) : null)}
            type="text"
            placeholder="Send a message"
            className="flex-1 outline-none placeholder:text-[var(--textblue)]"
          />
          <input
            onChange={handleSendImage}
            type="file"
            id="image"
            accept="image/png, image/jpg"
            hidden
          />
          <label htmlFor="image">
            <Image className=" max-w-7 cursor-pointer textlight" />
          </label>
        </div>
        <div onClick={handleSendMessage} className="bgblue p-2 rounded-full">
          <FaLocationArrow className="w-5 h-5 textlight cursor-pointer" />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-full gap-2 max-md:hidden">
      <img src={assets.logo} alt="" className="max-w-64" />
      <p className="font-medium text-lg textlight">Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatArea;
