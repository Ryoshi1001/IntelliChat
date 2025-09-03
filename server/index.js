import '../server/lib/envConfig.js'
import express from "express";
import mongoDBConnection from "./db/mongoDBConnection.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import messageRouter from "./routes/messageRoutes.js";
import cloudinaryConnection from "./lib/cloudinaryConnection.js";

await cloudinaryConnection();

const PORT = process.env.PORT || 3000;
const app = express();
// for socket.io
const server = http.createServer(app);

// initialize socketio serve
export const io = new Server(server, {
  cors: { origin: "*" },
});

// store online users : store data of all the online users.
export const userSocketMap = {}; // {userId: socketId}

// Socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("NEW USERID CONNECTED TO SOCKETIO:index.js", userId);

  // check if userId is available, and add data in userSocketMap
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // Emit online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // disconnect notification
  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED SOCKETIO:index.js ", userId);

    // delete userId from userSocketMap
    delete userSocketMap[userId];

    // Emit updated online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// middleware : limit for image upload size of 4mb
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// routes setup
// route for testing server
app.use("/api/status", (req, res) =>
  res.send("Server is live: /api/status route")
);
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

const startServer = async () => {
  try {
    await mongoDBConnection();
    server.listen(PORT, () => {
      console.log(`Server Running on Port: ${PORT}`);
    });
  } catch (error) {
    console.error("Error Connecting To DB: startServer(): ", error.message);
  }
};

startServer();
