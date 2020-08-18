const Game = require('../models/game-model')
const mongoose = require('mongoose')

const ObjectId = mongoose.Types.ObjectId

function formatDate(date) {
    var d = date ? new Date(date) : new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
}

module.exports = function(io) {

  createGame = async (req, res) => {
    const body = req.body
    if (!body) {
      return res.status(400).json({ success: false, error: 'You must provide a game', })
    }
    const game = new Game(body)
    if (!game) {
      return res.status(400).json({ success: false, error: 'You must provide a correct json game', })
    }

    await game
      .save()
      .then(() => {
        io.emit("add game", { message: 'Created new Game name: ' + game.keyWord, game_id: game._id })
        return res.status(201).json({
          success: true,
          data: game,
          message: 'Game created!',
        })
      })
      .catch(err => {
        return res.status(400).json({ success: false, error: err, })
      })
  }

  updateGameById = async (req, res) => {
    const body = req.body
    if (!body) {
      return res.status(400).json({ success: false, error: 'You must provide a game', })
    }
    await Game
      .findOne({ _id: ObjectId(req.params._id) }, async (err, game) => {
        if (err) {
          return res.status(400).json({ success: false, error: err, })
        }
        if (!game) {
          return res.status(404).json({ success: false, error: 'Game not found', })
        }
        var ipAddr = req.headers["x-forwarded-for"]
        if (ipAddr){
          var list = ipAddr.split(",")
          ipAddr = list[list.length-1]
        } else {
          ipAddr = req.connection.remoteAddress
        }

        game.winner_id = body.winner_id || game.winner_id
        game.curr_round = body.curr_round || game.curr_round
        game.curr_cards = body.curr_cards || game.curr_cards
        game.curr_cards_pile = body.curr_cards_pile || game.curr_cards_pile
        game.curr_score = body.curr_score || game.curr_score
        game.curr_player_id = body.curr_player_id || game.curr_player_id
        game.curr_dealer_id = body.curr_dealer_id || game.curr_dealer_id
        game
          .save()
          .then(() => {
            io.emit("Game", {message: 'Update Game name: ' + game.name})
            return res.status(201).json({
              success: true,
              data: game,
              message: 'Game updated!',
            })
          })
          .catch(err => {
            return res.status(400).json({ success: false, error: err, })
          })

      })
      .catch(err => {
        return res.status(400).json({ success: false, error: err, })
      })
  }

  deleteGameById = async (req, res) => {
    await Game
      .findOneAndDelete({ _id: ObjectId(req.params._id) }, (err) => {
        if (err) {
          return res.status(400).json({ success: false, error: err, })
        }

        io.emit("delete game", { message: 'Delete Game.', game_id: req.params._id })
        return res.status(200).json({ success: true, }) // data: game})
      })
      .catch(err => {
        return res.status(400).json({ success: false, error: err, })
      })
  }

  getGameById = async (req, res) => {
    await Game
      .find({ _id: ObjectId(req.params._id) })
      .populate('creator_id')
      .populate('winner_id')
      .populate('curr_player_id')
      .populate('curr_dealer_id')
      .exec((err, game) => {
        if (err) {
          return res.status(400).json({ success: false, error: err, })
        }
        if (!game.length) {
          return res.status(404).json({ success: false, error: 'Game not found', })
        }
        return res.status(200).json({ success: true, data: game})
      })
  }

  getGames = async (req, res) => {
    await Game
      .find({})
      .populate('creator_id')
      .populate('winner_id')
      .populate('curr_player_id')
      .populate('curr_dealer_id')
      .exec((err, games) => {
        if (err) {
          return res.status(400).json({ success: false, error: err, })
        }
        if (!games.length) {
          return res.status(404).json({ success: false, error: 'Games not found', })
        }
        return res.status(200).json({ success: true, data: games})
      })
  }

  return {
    createGame,
    updateGameById,
    deleteGameById,
    getGameById,
    getGames,
  }

}
