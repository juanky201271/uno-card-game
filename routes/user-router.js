const express = require('express')
const userRouter = express.Router()

module.exports = function(io) {
  const UserCtrl = require('../controllers/user-ctrl')(io)

  userRouter.post('/user', UserCtrl.createUser)
  userRouter.put('/user/:_id', UserCtrl.updateUserById)
  userRouter.delete('/user/:_id', UserCtrl.deleteUserById)
  userRouter.get('/user/_id/:_id', UserCtrl.getUserById)
  userRouter.get('/user/email/:email', UserCtrl.getUserByEmail)
  userRouter.get('/user/name/:name', UserCtrl.getUserByName)
  userRouter.get('/user/ip/:ip', UserCtrl.getUserByIp)
  userRouter.get('/users', UserCtrl.getUsers)

  return userRouter
}
