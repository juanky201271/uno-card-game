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
  io.sockets.emit('new connection', {}, socket.id, listClients, "New client connected " + socket.id)
  console.log("New client connected " + socket.id)

  socket.on('log in', function (obj, user_id, game_id, message) {
    listClients[socket.id] = { user_id: user_id }
    io.sockets.emit('log in', obj, socket.id, listClients, message)
    console.log(message)
  })

  socket.on('game', function (obj, user_id, game_id, message) {
    listClients[socket.id] = { user_id: user_id, game_id: game_id }
    io.sockets.emit('game', obj, socket.id, listClients, message)
    socket.join("game-" + game_id, function () {
      console.log(socket.id + ' : ' + Object.keys(socket.rooms))
      //io.sockets.in(socket.id).emit('rooms', Object.keys(socket.rooms))
    })
    console.log(message)
  })
  socket.on('start game', function (obj, user_id, game_id, message) {
    io.sockets.in("game-" + game_id).emit('start game', obj, socket.id, listClients, message)
    console.log(message)
  })
  socket.on('sincro game', function (obj, user_id, game_id, message) {
    io.sockets.in("game-" + game_id).emit('sincro game', obj, socket.id, listClients, message)
    console.log(message)
  })
  socket.on('sincro view game', function (obj, user_id, game_id, message) {
    io.sockets.in("game-" + game_id).emit('sincro view game', obj, socket.id, listClients, message)
    console.log(message)
  })
  socket.on('sincro say Uno game', function (obj, user_id, game_id, message) {
    io.sockets.in("game-" + game_id).emit('sincro say Uno game', obj, socket.id, listClients, message)
    console.log(message)
  })
  socket.on('play card', function (obj, user_id, game_id, message) {
    io.sockets.in("game-" + game_id).emit('play card', obj, socket.id, listClients, message)
    console.log(message)
  })
  socket.on('pick card', function (obj, user_id, game_id, message) {
    io.sockets.in("game-" + game_id).emit('pick card', obj, socket.id, listClients, message)
    console.log(message)
  })
  socket.on('cancel game multiple', function (obj, user_id, game_id, message) {
    io.sockets.in("game-" + game_id).emit('cancel game multiple', obj, socket.id, listClients, message)
    console.log(message)
  })
  socket.on('cancel game', function (obj, user_id, game_id, message) {
    listClients[socket.id] = { user_id: user_id }
    io.sockets.emit('cancel game', obj, socket.id, listClients, message)
    socket.leave("game-" + game_id, function () {
      console.log(socket.id + ' : ' + Object.keys(socket.rooms))
      //io.sockets.in(socket.id).emit('rooms', Object.keys(socket.rooms))
    })
    console.log(message)
  })

  socket.on('cancel game alone', function (obj, user_id, game_id, message) {
    listClients[socket.id] = { user_id: user_id }
    io.sockets.emit('cancel game alone', obj, socket.id, listClients, message)
    socket.leave("game-" + game_id, function () {
      console.log(socket.id + ' : ' + Object.keys(socket.rooms))
      //io.sockets.in(socket.id).emit('rooms', Object.keys(socket.rooms))
    })
    console.log(message)
  })

  socket.on('log out', function (obj, user_id, game_id, message) {
    delete listClients[socket.id]
    io.sockets.emit('log out', obj, socket.id, listClients, message)
    console.log(message)
  })
  socket.on("disconnect", () => {
    let game_id = listClients[socket.id] ? listClients[socket.id].game_id ? listClients[socket.id].game_id : null : null
    delete listClients[socket.id]
    io.sockets.emit('new disconnect', {}, socket.id, listClients, "Client disconnected " + socket.id)
    if (game_id !== null)
      io.sockets.in("game-" + game_id).emit('disconnect game', {}, socket.id, listClients, "Client game disconnected " + socket.id)
      //io.sockets.in("game-" + game_id).emit('cancel game multiple', {}, socket.id, listClients, "Cancel game disconnected " + socket.id)
    console.log("Client disconnected " + socket.id)
  })

  socket.on('add game', function (obj, user_id, game_id, message) {
    io.sockets.emit('add game', obj, socket.id, listClients, message)
    console.log(message)
  })
  socket.on('delete game', function (obj, user_id, game_id, message) {
    io.sockets.emit('delete game', obj, socket.id, listClients, message)
    console.log(message)
  })
})
