import express from 'express'
import { checkAuth, login, logout, signup, udpateProfile } from '../controllers/userControllers.js';
import { protectRoute } from '../middleware/protectRoute.js';

const userRouter = express.Router(); 

userRouter.post('/signup', signup)
userRouter.post('/login', login)
userRouter.put('/update-profile', protectRoute, udpateProfile)
userRouter.get('/check-auth', protectRoute, checkAuth)
userRouter.get('/logout', logout)

export default userRouter; 