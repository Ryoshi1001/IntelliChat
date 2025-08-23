import mongoose from "mongoose";
import User from "../models/usermodel.js";
import bcrypt from "bcrypt";
import generateTokenSetCookies from "../lib/generateTokenSetCookies.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password, bio } = req.body;

    // checks: if email is valid, user already exists, then hashpassword if new user

    const emailRegex =
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid Email" });
    }

    //check if user email already exists
    const existingUserEmail = await User.findOne({ email });

    if (existingUserEmail) {
      return res
        .status(400)
        .json({ message: "User email already exists try logging in" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    console.log("coins backend salt: ", salt);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password,
      bio,
    });

    // add token and cookie, save and create new user and send response to frontend:
    if (newUser) {
      generateTokenSetCookies(newUser._id, res);
      await newUser.save();

      res.status(200).json({
        _id: newUser._id,
        status: "success",
        message: `Account for ${fullName} made successfully`,
        fullName,
        email,
        password,
        bio,
      });
    } else {
      res.status(500).json({ error: "Invalid user data" });
    }

    console.log("newuser made consolelog: signup()?", newUser);
  } catch (error) {
    console.error("error in backend signup function", error.message);
    res
      .status(500)
      .json({ error: "Error res.status 500 making user in catch " });
  }
};

export const login = (req, res) => {
  res.send("login");
};

export const logout = (req, res) => {
  res.send("logout");
};

export const udpateProfile = (req, res) => {
  res.send("profile update controller")
}
