import express from 'express'
import dotenv from 'dotenv'
import mongoDBConnection from './db/mongoDBConnection.js';
import routes from './routes/routes.js'
import cors from 'cors'

dotenv.config()

const PORT = process.env.PORT
const app = express();
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true, 
}))

app.use('/api', routes)

const startServer = async () => {
  try {
    await mongoDBConnection(); 
    app.listen(PORT, () => {
      console.log(`Server Running on Port: ${PORT}`)
    })
  } catch (error) {
    console.error("Error Connecting To DB: startServer(): ", error.message)
  }
}

startServer(); 

