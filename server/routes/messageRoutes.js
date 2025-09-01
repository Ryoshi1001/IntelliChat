import express from 'express'
import { generateMessage, getMessages, getUsersForSideBar, markMessageAsSeen, sendMessage } from '../controllers/messageControllers.js';
import { protectRoute } from '../middleware/protectRoute.js'

// import express create express router
const messageRouter = express.Router()

// endpoints for message controllers
messageRouter.get('/get-users', protectRoute, getUsersForSideBar)
messageRouter.get('/selected-user-messages/:id', protectRoute, getMessages)
messageRouter.put('/mark-message-seen/:id', protectRoute, markMessageAsSeen)
messageRouter.post('/send-message/:id', protectRoute, sendMessage)

// generate message route
messageRouter.post('/generate-message', protectRoute, generateMessage)

export default messageRouter; 