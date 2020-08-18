const Player = require('../models/player-model')
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

  createPlayer = async (req, res) => {
    const body = req.body
    if (!body) {
      return res.status(400).json({ success: false, error: 'You must provide a player', })
    }
    const player = new Player(body)
    if (!player) {
      return res.status(400).json({ success: false, error: 'You must provide a correct json player', })
    }

    await player
      .save()
      .then(() => {
        io.emit("Player", {message: 'Created new Player name: ' + player.keyWord})
        return res.status(201).json({
          success: true,
          data: player,
          message: 'Player created!',
        })
      })
      .catch(err => {
        return res.status(400).json({ success: false, error: err, })
      })
  }

  updatePlayerById = async (req, res) => {
    const body = req.body
    if (!body) {
      return res.status(400).json({ success: false, error: 'You must provide a player', })
    }
    await Player
      .findOne({ _id: ObjectId(req.params._id) }, async (err, player) => {
        if (err) {
          return res.status(400).json({ success: false, error: err, })
        }
        if (!player) {
          return res.status(404).json({ success: false, error: 'Player not found', })
        }
        var ipAddr = req.headers["x-forwarded-for"]
        if (ipAddr){
          var list = ipAddr.split(",")
          ipAddr = list[list.length-1]
        } else {
          ipAddr = req.connection.remoteAddress
        }

        player.score = body.score || player.score
        player.curr_round = body.curr_round || player.curr_round
        player.curr_cards = body.curr_cards || player.curr_cards
        player.curr_cards_pile = body.curr_cards_pile || player.curr_cards_pile
        player.curr_score = body.curr_score || player.curr_score
        player
          .save()
          .then(() => {
            io.emit("Player", {message: 'Update Player name: ' + player.name})
            return res.status(201).json({
              success: true,
              data: player,
              message: 'Player updated!',
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

  deletePlayerById = async (req, res) => {
    await Player
      .findOneAndDelete({ _id: ObjectId(req.params._id) }, (err) => {
        if (err) {
          return res.status(400).json({ success: false, error: err, })
        }

        io.emit("Player", {message: 'Delete Player.'})
        return res.status(200).json({ success: true, }) // data: player})
      })
      .catch(err => {
        return res.status(400).json({ success: false, error: err, })
      })
  }

  getPlayerById = async (req, res) => {
    await Player
      .find({ _id: ObjectId(req.params._id) })
      .populate('user_id')
      .populate('game_id')
      .exec((err, player) => {
        if (err) {
          return res.status(400).json({ success: false, error: err, })
        }
        if (!player.length) {
          return res.status(404).json({ success: false, error: 'Player not found', })
        }
        return res.status(200).json({ success: true, data: player})
      })
  }

  getPlayersByGameId = async (req, res) => {
    await Player
      .find({ game_id: ObjectId(req.params.game_id) })
      .populate('user_id')
      .populate('game_id')
      .exec((err, players) => {
        if (err) {
          return res.status(400).json({ success: false, error: err, })
        }
        if (!players.length) {
          return res.status(404).json({ success: false, error: 'Player not found', })
        }
        return res.status(200).json({ success: true, data: players})
      })
  }

  getPlayers = async (req, res) => {
    await Player
      .find({})
      .populate('user_id')
      .populate('game_id')
      .exec((err, players) => {
        if (err) {
          return res.status(400).json({ success: false, error: err, })
        }
        if (!players.length) {
          return res.status(404).json({ success: false, error: 'Players not found', })
        }
        return res.status(200).json({ success: true, data: players})
      })
  }

  return {
    createPlayer,
    updatePlayerById,
    deletePlayerById,
    getPlayerById,
    getPlayersByGameId,
    getPlayers,
  }

}
