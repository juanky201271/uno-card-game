require("dotenv").config()
//const cookieSession = require("cookie-session")
const path = require("path")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 8000 // express

const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const cors = require("cors")
const http = require("http").createServer(app)
const socketIo = require("socket.io")

const io = socketIo(http)

const userRouter = require('./routes/user-router')(io)
const gameRouter = require('./routes/game-router')(io)
const playerRouter = require('./routes/player-router')(io)

const db = require('./db')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(
  cors()
)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', userRouter)
app.use('/api', gameRouter)
app.use('/api', playerRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "client/build")))

  app.use(function(req, res) {
  	res.sendFile(path.join(__dirname, '../client/build/index.html'))
  })
}

const server = http.listen(PORT, () => console.log(`Server on Port ${PORT}`))

let interval

io.on("connection", (socket) => {
  console.log("New client connected")
  if (interval) {
    clearInterval(interval)
  }
  //interval = setInterval(() => getApiAndEmit(socket), 1000)
  socket.on("disconnect", () => {
    console.log("Client disconnected")
    clearInterval(interval)
  })
})

const getApiAndEmit = socket => {
  const response = new Date()
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response)
}
