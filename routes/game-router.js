const express = require('express')
const gameRouter = express.Router()

module.exports = function(io) {
  const GameCtrl = require('../controllers/game-ctrl')(io)

  gameRouter.post('/game', GameCtrl.createGame)
  gameRouter.put('/game/:_id', GameCtrl.updateGameById)
  gameRouter.delete('/game/:_id', GameCtrl.deleteGameById)
  gameRouter.get('/game/:_id', GameCtrl.getGameById)
  gameRouter.get('/games', GameCtrl.getGames)

  return gameRouter
}
