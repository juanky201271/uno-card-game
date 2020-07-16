const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Games = new Schema({
  //key - _id
  creator_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'ucg-users'
  },
  winner_id: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'ucg-users'
  },
  keyWord: { type: 'String', required: true },
  players: { type: 'String', required: true },
  cards: { type: 'String', required: true },
  curr_round: { type: 'Number', required: true },
  curr_cards: { type : Array , "default" : [] },
  curr_cards_pile: { type : Array , "default" : [] },
  curr_score: { type: 'Number', required: true },
  curr_player_id: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'ucg-users'
  },
  curr_dealer_id: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'ucg-users'
  },
})
module.exports = mongoose.model('ucg-games', Games)
