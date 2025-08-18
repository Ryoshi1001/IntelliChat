import { SignIn, useUser } from "@clerk/clerk-react";
import { MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/Sidebar";

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();
  return user ? (
    <div className="h-screen flex px-4 items-center justify-center">

      <div className="max-w-5xl w-full border rounded-lg border-[var(--borders)]">
          <nav className="w-full min-h-20 px-4 flex  flex-shrink-0 flex-row items-center justify-between border-b border-[var(--borders)]">
        <img
          onClick={() => navigate("/")}
          src="logo.png"
          alt=""
          className="w-28 sm:w-32 cursor-pointer flex-shrink-0"
        />

        {/* menu buttons for layout and dashboard */}
        {sidebar ? (
          <X className="sm:hidden" onClick={() => setSidebar(false)} />
        ) : (
          <MenuIcon className="sm:hidden" onClick={() => setSidebar(true)} />
        )}
      </nav>

      <div className="flex flex-1 w-full overflow-hidden rounded-br-lg rounded-bl-lg">
        <SideBar sidebar={sidebar} setSidebar={setSidebar} />

        <div className="bg-blue-400 flex-1 ">
          <Outlet />
        </div>
      </div>
    </div>
      </div>
    
  ) : (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default Layout;
