require("dotenv").config()

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

const listClients = {}

io.on("connection", (socket) => {
  console.log("New client connected " + socket.id)
  socket.on('log in', function (obj) {
    obj.message = "<" + socket.id + "> " + obj.message
    console.log(obj)
    listClients[socket.id] = { user_id: obj.user_id }
    io.sockets.emit('log in', obj, socket.id, listClients)
  });
  socket.on('game', function (obj) {
    obj.message = "<" + socket.id + "> " + obj.message
    console.log(obj)
    listClients[socket.id] = { user_id: obj.user_id, game_id: obj.game_id }
    socket.join("game-" + obj.game_id)
    io.sockets.in("game-" + obj.game_id).emit('game', obj, socket.id, listClients)
    //console.log('clients', io.sockets.clients())
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected " + socket.id)
  })
})
