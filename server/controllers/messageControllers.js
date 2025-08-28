import cloudinary from "../lib/cloudinaryConnection.js";
import Message from "../models/messageModel.js"; // adjust path as needed
import User from "../models/userModel.js";
import { io, userSocketMap } from "../index.js";

// get all users except logged in user for sidebar and unseen messages for logged in user:
export const getUsersForSideBar = async (req, res) => {
  try {
    // get logged in user, middleware used in this route
    const userId = req.user._id;

    // filter users from all users by _id in db using mongoose not equal $ne
    const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    // count number messages not seen
    const unseenMessages = {};

    // unseen messages for reciever/logged in user by: userId, will display unseen message count in sidebar UI for logged in user
    const promises = filteredUsers.map(async (user) => {
      const messages = await Message.find({
        senderId: user._id,
        receiverId: userId,
        seen: false,
      });

      // check unseen messages length for logged in user
      if (messages.length > 0) {
        unseenMessages[user._id] = messages.length;
      }
    });

    await Promise.all(promises);
    // send users and unseen messages in reponse to frontend
    res.json({
      success: true,
      users: filteredUsers,
      unseenMessages,
    });
  } catch (error) {
    console.log(
      "Error in getUsersForSideBar controller function with sidebar users and unseen messages",
      error.message
    );
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// get all messages between selected user
export const getMessages = async (req, res) => {
  try {
    // get selected user by id / sidebar users list*
    const { id: selectedUserId } = req.params;

    //own id / logged in user id
    const myId = req.user._id;

    // all messages between two users
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: selectedUserId },
        { senderId: selectedUserId, receiverId: myId },
      ],
    });

    // mark message as read/seen
    await Message.updateMany(
      { senderId: selectedUserId, receiverId: myId },
      { seen: true }
    );

    // generate response to frontend
    res.json({
      success: true,
      messages,
      message: "All messages for seleced user from db",
    });
  } catch (error) {
    console.log(
      "Error in getMessages controller function for getting all messages for selected user",
      error.message
    );
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// function to mark messages as seen using message id
export const markMessageAsSeen = async (req, res) => {
  try {
    // get message id by params
    const { id } = req.params;

    // mark message as seen in db
    await Message.findByIdAndUpdate(id, { seen: true });

    res.json({
      success: true,
      message: "Message marked as seen",
    });
  } catch (error) {
    console.log(
      "Error in markMessageAsSeen controller function: ",
      error.message
    );
    res.json({ success: false, message: error.message });
  }
};

//function to send messages to selected user
export const sendMessage = async (req, res) => {
  try {
    // get message, logged in User id, selected user id
    const { text, image } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    // if there is a image upload to cloudinary first
    let imageUrl;
    if (image) {
      const upload = await cloudinary.uploader.upload(image);
      imageUrl = upload.secure_url;
    }

    // store message into database
    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    // Emit new message to reciever's socket
    const receiverSocketId = userSocketMap[receiverId];

    // when receiverId is available/truthy
    if (receiverId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    // response
    res.json({
      success: true,
      newMessage,
    });
    //* want this message to be sent instantly in real time to be displayed in recievers chat using socketio
  } catch (error) {
    console.log("Error in sendMessage controller function: ", error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
