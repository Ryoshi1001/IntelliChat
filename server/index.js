import express from 'express'
import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path'
import { Server } from 'socket.io'

const app = express();
const server = createServer(app)
const io = new Server(server)

const __dirname = dirname(fileURLToPath(import.meta.url))


app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'))
})

io.on('connection', (socket) => {
  console.log('user conntected')

  socket.on('disconnect', () =>{
    console.log('user can be disconnected')
  })

  // broadcast an event to all connected clients with io.emit():
  socket.on('message', (msg) => {
    io.emit('message', msg)
    console.log("emiited message can be: " + msg)
  })
})

server.listen(3000, () => {
  console.log('server is working on localhost:3000')
})
