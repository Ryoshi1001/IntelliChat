import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const App = () => {
const { authUser } = useContext(AuthContext)!; 
// const context = useContext(AuthContext);
// if (!context) throw new Error("AuthContext is undefined");
// const { authUser } = context;
console.log('app.tsx authUser:', authUser)
  return (
    <div>
      <Toaster />
      <Routes>
        {/* self closing here */}
        <Route path="/" element={authUser ? <Home /> : <Navigate to={"/login"}/>} />
        <Route path="/login" element={authUser ? <Home/> : <Navigate to={'/login'} />}/>
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to={"/login"}/>}/>
      </Routes>
    </div>
  );
};

export default App;
