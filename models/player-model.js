const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Players = new Schema({
  //key - _id
  player_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'ucg-users'
  },
  game_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'ucg-games'
  },
  score: { type: 'Number', required: true },
  curr_round: { type: 'Number', required: true },
  curr_cards: { type : Array , "default" : [] },
  curr_cards_pile: { type : Array , "default" : [] },
  curr_score: { type: 'Number', required: true },
  uno: {type: 'Boolean', required: true },
})
module.exports = mongoose.model('ucg-players', Players)
