import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { Socket } from "socket.io-client";
import axios from "axios";
import toast from "react-hot-toast";

// const backendUrl = import.meta.env.VITE_BACKEND_URL;

// axios.defaults.baseURL = backendUrl;

interface UserType {
  _id: string;
  fullName: string;
  email: string;
  profilePic?: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface MessageType {
  _id: string;
  senderId?: string | undefined;
  receiverId?: string | undefined;
  text?: string;
  image?: string;
  seen: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ChatContextType {
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  users: UserType[];
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
  selectedUser: UserType | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  unseenMessages: Record<string, number>;
  setUnseenMessages: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  getUsersForSideBar: () => Promise<void>; 
  getMessages: (userId: any) => Promise<void>; 
  sendMessage:  (messageData: any) => Promise<void>; 
  generateMessage: (prompt: string) => Promise<void>;
  generatedMessage: String | null; 
  setGeneratedMessage: React.Dispatch<React.SetStateAction<String | null>>, 
  socket: Socket | null;
  axios: typeof axios;
}

export const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  // state chat variables for app

  // list of users for left sidebar
  const [users, setUsers] = useState<UserType[]>([]);

  //messages from selected user
  const [messages, setMessages] = useState<MessageType[]>([]);

  // store id of user that is selected to chat with
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  // for unseen messages: user id and number of unseen messages: key: userid value: number of unseen messages
  const [unseenMessages, setUnseenMessages] = useState<Record<string, number>>(
    {}
  );

  // generated messages
  const [generatedMessage, setGeneratedMessage] = useState<String>(''); 


  // import socket and axios created in AuthContext
  const { axios, socket } = useContext(AuthContext)!;

  // function for AI generated messages
  const generateMessage = async (prompt: string) => {
    try {
      const { data } = await axios.post("/api/messages/generate-message", {prompt})
      if(data.success){
        setGeneratedMessage(data.content)
      }
      toast.success("Message Generated");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  // chat functions for app
  // get all users for side bar and number of unseen messages for logged in user
  const getUsersForSideBar = async () => {
    try {
      const { data } = await axios.get("/api/messages/get-users");

      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // get all messages for logged in user from selected user on sidebar
  const getMessages = async (userId: any) => {
    try {
      const { data } = await axios.get(
        `/api/messages/selected-user-messages/${userId}`
      );
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // send message to selected user
  const sendMessage = async (messageData: any) => {
    try {
      const { data } = await axios.post<{
        success: boolean;
        newMessage: MessageType;
      }>(`/api/messages/send-message/${selectedUser?._id}`, messageData);
      if (data.success) {
        setMessages((prevMessages) => [...prevMessages, data.newMessage]);
      } else {
        toast.error('toast error');
      }
    } catch (error) {
      toast.error('toast error in sendmessage context');
    }
  };

  // function to subscribe to messages for selected user to messages in real time/ socket.io
  const subscribeToMessages = async () => {
    // if socket is not connected
    if(!socket) return; 

    socket.on("newMessage", (newMessage) => {
      if(selectedUser && newMessage.senderId === selectedUser._id){
        newMessage.seen = true;
        setMessages((prevMessages) => [...prevMessages, newMessage])
        axios.put(`/api/messages/mark-message-seen/${newMessage._id}`)
       } else {
        // if new message emits but user sender is not selectedUser id
        setUnseenMessages((previousUnseenMessages) => ({
          ...previousUnseenMessages, [newMessage.senderId] : previousUnseenMessages[newMessage.senderId] ? previousUnseenMessages[newMessage.senderId] + 1 : 1
        }))
       }
    })
  }

  // function to unsubscribe from messages
  const unsubscribeFromMessages = () => {
    if(socket) socket.off("newMessage")
  }


  // on page load run subscribeToMessages and unsubscribeFromMessages
  useEffect(() => {
    subscribeToMessages(); 
    return () => unsubscribeFromMessages()
  }, [socket, selectedUser])
 
  const value: any = {
    messages, 
    users, 
    selectedUser, 
    getUsersForSideBar, 
    getMessages, 
    sendMessage, 
    setSelectedUser, 
    setUnseenMessages, 
    unseenMessages,
    generateMessage, 
    generatedMessage, 
    setGeneratedMessage, 
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
