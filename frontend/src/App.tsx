import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ChatArea from "./pages/ChatArea";
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

        {/* closing route tag with nested routes */}
        {/* when going to path of nested Route Layout will be mounted on all pages */}
        <Route path="/chat" element={<Layout />}>
          {/* <Route path="/chat" element={<Layout />}> */}
          {/* index means /ai/ just like home path but for first nested route these
          paths show with the Outlet component from react-router-dom in the Layout file. 
          */}
          <Route index element={<Dashboard />} />
          <Route path="chatarea" element={<ChatArea/>}/>

          {/* for extra routes in dashboard <Route index element={<Dashboard />} />
          <Route path="write-article" element={<WriteArticle />} /> */}
          {/* </Route> */}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
