import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";

// add backend url
const backendUrl = import.meta.env.VITE_BACKEND_URL;
// add to axios as baseurl
axios.defaults.baseURL = backendUrl;

interface AuthUser {
  _id: string;          
  fullName: string;     
  email: string;        
  profilePic?: string;   
  bio?: string;         
  createdAt?: string;    
  updatedAt?: string;    
}


interface AuthContextType {
  authUser: AuthUser | null;
  onlineUsers: string[];
  socket: Socket | null;
  login: (state: string, credentials: any) => Promise<void>;
  logout: () => void;
  updateProfile: (body: any) => Promise<void>;
  axios: typeof axios; 
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider
export const AuthProvider = ({ children } : { children: React.ReactNode }) => {
  // state variables used in entire app
  // use localStorage.getItem to get any token stored in localStorage to use state variable [token]
const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
const [authUser, setAuthUser] = useState<AuthUser | null>(null);
const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
const [socket, setSocket] = useState<Socket | null>(null);


  //functions for app
  // check if user is authenticated, if so, set the user data and connect to socketio
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check-auth");

      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // login function to handle user auth and socket connection
  const login = async (state: string, credentials: any) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);
      console.log('DATA IN LOGIN AUTHCONTEXT FUNCTION:', data)
      if (data.success) {
        setAuthUser(data.userData);
        connectSocket(data.userData);
        axios.defaults.headers.common["token"] = data.token;
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // logout function to handle user logout and socketio disconnect
  const logout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    setOnlineUsers([]);
    axios.defaults.headers.common["token"] = null;
    toast.success("Logged out successfully");
    socket?.disconnect();
  };

  // update profile function
  const updateProfile = async (body: any) => {
    try {
      const { data } = await axios.put("/api/auth/update-profile", body);
      console.log('data in authContext updateaProfile: ', data)
      if (data.success) {
        setAuthUser(data.user);
        console.log('data . user in updateprofile authcontext: ', data.user)

        toast.success(data.message);
      } else {
        toast.error(data.error);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // connectSocket function for handling the socket connect and updating the online users
  const connectSocket = (userData: AuthUser) => {
    if (!userData || socket?.connected) return;

    const newSocket = io(backendUrl, {
      query: { userId: userData._id },
    });
    newSocket.connect();
    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });
  };

  // on app load check for token and set token then run checkAuth function
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["token"] = token;
    }
    checkAuth();
  }, []);

  // pass variables to value object
  const value = {
    axios,
    authUser,
    onlineUsers,
    socket,
    login, 
    logout, 
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
