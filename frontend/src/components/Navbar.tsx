import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  return (
    <div className="fixed top-0 left-0 w-full h-24 bg-[var(--logoblue)] z-30 px-4">
      <div className="flex flex-row items-center justify-between max-w-7xl mx-auto">
        <img
          onClick={() => navigate("/")}
          src="logo.png"
          alt=""
          className="w-24 h-auto object-cover"
        />
        {/* desktop nav btns */}
        {user ? (
          <div className="flex flex-row gap-4 items-center">
            <button
            onClick={() => navigate('/chat')}
            className="gradient3 opacity-80 py-2 px-8 rounded-full text-[var(--textprimary)] font-semibold cursor-pointer hover:scale-105 transition-all duration-300 "
          >
            Chat
          </button>          
          <UserButton />     
          </div>
     
        ) : (
          <button
            onClick={() => openSignIn()}
            className="gradient3 opacity-80 py-2 px-8 rounded-full text-[var(--textprimary)] font-semibold cursor-pointer hover:scale-105 transition-all duration-300 "
          >
            Login
          </button>
        )}
      </div>

      {/* mobile menu */}
    </div>
  );
};

export default Navbar;
