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
  io.sockets.in(socket.id).emit('new connection', {}, socket.id, listClients)

  socket.on('log in', function (obj) {
    listClients[socket.id] = { user_id: obj.user_id }
    io.sockets.emit('log in', obj, socket.id, listClients)
    console.log(obj.message)
  })
  socket.on('game', function (obj) {
    listClients[socket.id] = { user_id: obj.user_id, game_id: obj.game_id }
    socket.join("game-" + obj.game_id)
    io.sockets.emit('game', obj, socket.id, listClients)
    console.log(obj.message)
  })
  socket.on('start', function (obj) {
    io.sockets.in("game-" + obj.game_id).emit('start', obj, socket.id, listClients)
    console.log(obj.message)
  })
  socket.on('sincro', function (obj, game_id) {
    let message = "sending data to sincronize"
    io.sockets.in("game-" + game_id).emit('sincro', obj, socket.id, listClients, message)
    console.log(message)
  })
  socket.on('pile card', function (obj, game_id) {
    let message = "play a card"
    io.sockets.in("game-" + game_id).emit('pile card', obj, socket.id, listClients, message)
    console.log(message)
  })
  socket.on('pick card', function (obj, game_id) {
    let message = "pick a card"
    io.sockets.in("game-" + game_id).emit('pick card', obj, socket.id, listClients, message)
    console.log(message)
  })
  socket.on('cancel game', function (obj, game_id) {
    let message = "cancel the game"
    Object.entries(listClients).forEach((ele, ind) => {
      if (ele[1].game_id === game_id) listClients[ele[0]] = { user_id: ele[1].user_id }
    })
    io.sockets.in("game-" + game_id).emit('cancel game', obj, socket.id, listClients, message)
    socket.leave("game-" + obj.game_id)
    console.log(message)
  })
  socket.on('cancel game alone', function (obj, game_id) {
    let message = "cancel the game"
    Object.entries(listClients).forEach((ele, ind) => {
      if (ele[1].game_id === game_id) listClients[ele[0]] = { user_id: ele[1].user_id }
    })
    io.sockets.emit('cancel game alone', obj, socket.id, listClients, message)
    console.log(message)
  })
  socket.on('cancel', function (obj, game_id) {
    let message = "cancel"
    listClients[socket.id] = { user_id: obj.user_id }
    io.sockets.emit('cancel', obj, socket.id, listClients, message)
    socket.leave("game-" + obj.game_id)
    console.log(message)
  })
  socket.on('sincro view', function (obj, game_id) {
    let message = "sending view cards"
    io.sockets.in("game-" + game_id).emit('sincro view', obj, socket.id, listClients, message)
    console.log(message)
  })
  socket.on("disconnect", () => {
    delete listClients[socket.id]
    io.sockets.emit('log out', {}, socket.id, listClients)
    console.log("Client disconnected " + socket.id)
  })
  socket.on('log out', function (obj) {
    delete listClients[socket.id]
    io.sockets.emit('log out', obj, socket.id, listClients)
    console.log(obj.message)
  })

  socket.on('add game', function (obj) {
    io.sockets.emit('add game', obj, socket.id)
    console.log(obj.message)
  })
  socket.on('delete game', function (obj) {
    io.sockets.emit('delete game', obj, socket.id)
    console.log(obj.message)
  })
})
