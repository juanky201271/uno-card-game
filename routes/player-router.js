const express = require('express')
const playerRouter = express.Router()

module.exports = function(io) {
  const PlayerCtrl = require('../controllers/player-ctrl')(io)

  playerRouter.post('/player', PlayerCtrl.createPlayer)
  playerRouter.put('/player/:_id', PlayerCtrl.updatePlayerById)
  playerRouter.delete('/player/:_id', PlayerCtrl.deletePlayerById)
  playerRouter.get('/player/:_id', PlayerCtrl.getPlayerById)
  playerRouter.get('/players', PlayerCtrl.getPlayers)

  return playerRouter
}
