import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div className="gradient1">
      <Toaster />
      <Routes>
        {/* self closing here */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </div>
  );
};

export default App;
