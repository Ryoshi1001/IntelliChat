import express from 'express'
import { checkAuth, login, signup, udpateProfile } from '../controllers/userControllers.js';
import { protectRoute } from '../middleware/protectRoute.js';

const userRouter = express.Router(); 

userRouter.post('/signup', signup)
userRouter.post('/login', login)
userRouter.put('/update-profile', protectRoute, udpateProfile)
userRouter.get('/check-auth', protectRoute, checkAuth)

export default userRouter; 