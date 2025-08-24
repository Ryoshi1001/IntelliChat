import express from 'express'
import dotenv from 'dotenv'
import mongoDBConnection from './db/mongoDBConnection.js';
import routes from './routes/routes.js'
import cors from 'cors'
import http from 'http'

dotenv.config()

const PORT = process.env.PORT || 3000; 
const app = express();
// for socket.io
const server  = http.createServer(app)

// middleware : limit for image upload size of 4mb
app.use(express.json({limit: "4mb"}))
app.use(cors())

// routes
// route for testing server
app.use('/api/status', (req, res) => res.send("Server is live: /api/status route") )
app.use('/api', routes)

const startServer = async () => {
  try {
    await mongoDBConnection(); 
    server.listen(PORT, () => {
      console.log(`Server Running on Port: ${PORT}`)
    })
  } catch (error) {
    console.error("Error Connecting To DB: startServer(): ", error.message)
  }
}

startServer(); 

