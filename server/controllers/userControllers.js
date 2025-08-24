import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generateTokenSetCookies from "../lib/generateTokenSetCookies.js";
import User from "../models/usermodel.js";
import cloudinary from "../lib/cloudinaryConnection.js";

export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  try {
    // check if all required data from frontend is available
    if (!fullName || !email || !password || !bio) {
      return res.json({
        success: false,
        message: "Missing SignUp Details",
      });
    }

    //check if email is valid
    const emailRegex =
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;

    if (!emailRegex.test(email)) {
      return res.json({
        success: false,
        message: "Invalid Email",
      });
    }

    // get User model and check if any user exists with valid email provided:
    const user = await User.findOne({ email });

    if (user) {
      return res.json({
        success: false,
        messagea: "Account Already Exists",
      });
    }

    //If new user then generate encrypted password: stores hashed password into database not the original user password
    const salt = await bcrypt.genSalt(10);
    console.log("backend salt: ", salt);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create the new user
    const newUser = await User.create({
      fullName,
      email,
      hashedPassword,
      bio,
    });

    // create token to authenticate new user
    const token = generateTokenSetCookies(newUser._id);

    // send token as a response
    res.json({
      success: true,
      newUser,
      token,
      message: `Account created successfully`,
    });

    console.log("newUser made consolelog from controller: signup()?", newUser);
  } catch (error) {
    console.error(
      "error in backend signup function catch block",
      error.message
    );
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //check and find user with the login email in db
    const user = await User.findOne({ email });

    //check password against hashed password
    const isPasswordValid = await bcrypt.compare(password, user?.password);

    //reponse if password is invalid
    if (!isPasswordValid) {
      res.json({
        success: false,
        message: "Invalid Password",
      });
    }

    //if password is correct generate new token send success response with token, user, and message
    const token = generateTokenSetCookies(user._id);

    res.json({
      success: true,
      user,
      token,
      message: "Login Successful",
    });
  } catch (error) {
    console.log("Error in login controller function: ", error.message)
    res.json({
      success: false, 
      message: error.message, 
    })
  }
};

//controller function to check if user is authenticated: auth check
//function will return the user data when user is authenticated
export const checkAuth = (req, res) => {
  res.json({
    success: true,
    user: req.user
  })
}

//controller function using cloudinary to update profile images
export const udpateProfile = async (req, res) => {
  try {
    const {name, bio, profileImage} = req.body

  //add user id get it from the request / middleware
  const userId = req.user._id; 
  
  let updatedUser; 

  // check what user wants to upload, bio or name; with or without image
  if(!profileImage) {
    updatedUser = await User.findByIdAndUpdate(userId, {bio, name}, {new: true})
  } else{
    const upload = await cloudinary.uploader.upload(profileImage)

    updatedUser = await User.findByIdAndUpdate(userId, {profileImage: upload.secure_url, bio, name}, {new: true})
    
    res.json({
      success: true, 
      user: updatedUser, 
      message: "Profile updated"
    })
  } 
  
  } catch (error) {
    console.log("Error in updateProfile function controller", error.message)
    res.json({
      success: false, 
      message: error.message
    })
  }
};


export const logout = (req, res) => {
  res.send("logout");
};
