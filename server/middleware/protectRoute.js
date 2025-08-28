//middleware is function that executes before the controller functions
import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'

// Middleware to protect routes: the next is to run the controller function after protectRoute
export const protectRoute = async (req, res, next) => {
  try {
    // need to get token from headers, token sent from frontend headers in every api request
    const token = req.headers.token; 
    console.log('protectedRoute token', token)

    // decode token to get the userId from the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    //get user by id by the decodedToken minus password
    const user = await User.findById(decodedToken.userId).select("-password")

    //extra check if no user even after valid token
    if(!user){
      res.json({
        success: false, 
        message: "User not found"
      })
    }

    //if user exists add the user to the request: 
    req.user = user; 
    //next() will execute the next controller function 
    next()
  } catch (error) {
    console.log("Error in middlware protectRoute function: ", error.message)
    res.json({
      success: false, 
      message: error.message
    })
  }
}



