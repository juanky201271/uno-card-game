const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Users = new Schema({
  //key - _id
  name: {type: 'String', required: true},
  email: {type: 'String', required: true},
  password: {type: 'String', required: true},
  ip: {type: 'String', required: true},
})
module.exports = mongoose.model('ucg-users', Users)
