const User = require('../models/user-model')
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

  createUser = async (req, res) => {
    const body = req.body
    if (!body) {
      return res.status(400).json({ success: false, error: 'You must provide a user', })
    }
    const user = new User(body)
    if (!user) {
      return res.status(400).json({ success: false, error: 'You must provide a correct json user', })
    }
    var ipAddr = req.headers["x-forwarded-for"]
    if (ipAddr){
      var list = ipAddr.split(",")
      ipAddr = list[list.length-1]
    } else {
      ipAddr = req.connection.remoteAddress
    }

    user.ip = ipAddr
    await user
      .save()
      .then(() => {
        io.emit("User", {message: 'Created new User name: ' + user.name})
        return res.status(201).json({
          success: true,
          data: user,
          message: 'User created!',
        })
      })
      .catch(err => {
        return res.status(400).json({ success: false, error: err, })
      })
  }

  updateUserById = async (req, res) => {
    const body = req.body
    if (!body) {
      return res.status(400).json({ success: false, error: 'You must provide a user', })
    }
    await User
      .findOne({ _id: ObjectId(req.params._id) }, async (err, user) => {
        if (err) {
          return res.status(400).json({ success: false, error: err, })
        }
        if (!user) {
          return res.status(404).json({ success: false, error: 'User not found', })
        }
        var ipAddr = req.headers["x-forwarded-for"]
        if (ipAddr){
          var list = ipAddr.split(",")
          ipAddr = list[list.length-1]
        } else {
          ipAddr = req.connection.remoteAddress
        }

        user.name = body.name || user.name
        user.email = body.email || user.email
        user.password = body.password || user.password
        user.ip = ipAddr || user.ip
        user
          .save()
          .then(() => {
            io.emit("User", {message: 'Update User name: ' + user.name})
            return res.status(201).json({
              success: true,
              data: user,
              message: 'User updated!',
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

  deleteUserById = async (req, res) => {
    await User
      .findOneAndDelete({ _id: ObjectId(req.params._id) }, (err) => {
        if (err) {
          return res.status(400).json({ success: false, error: err, })
        }

        io.emit("User", {message: 'Delete User.'})
        return res.status(200).json({ success: true, }) // data: user})
      })
      .catch(err => {
        return res.status(400).json({ success: false, error: err, })
      })
  }

  getUserById = async (req, res) => {
    await User
      .findOne({ _id: ObjectId(req.params._id) }, (err, user) => {
        if (err) {
          return res.status(400).json({ success: false, error: err, })
        }
        if (!user) {
          return res.status(404).json({ success: false, error: 'User not found', })
        }
        return res.status(200).json({ success: true, data: user})
      })
      .catch(err => {
        return res.status(400).json({ success: false, error: err, })
      })
  }

  getUserByEmail = async (req, res) => {
    await User
      .findOne({ email: req.params.email }, (err, user) => {
        if (err) {
          return res.status(400).json({ success: false, error: err, })
        }
        if (!user) {
          return res.status(404).json({ success: false, error: 'User not found', })
        }
        return res.status(200).json({ success: true, data: user})
      })
      .catch(err => {
        return res.status(400).json({ success: false, error: err, })
      })
  }

  getUserByName = async (req, res) => {
    await User
      .findOne({ name: req.params.name }, (err, user) => {
        if (err) {
          return res.status(400).json({ success: false, error: err, })
        }
        if (!user) {
          return res.status(404).json({ success: false, error: 'User not found', })
        }
        return res.status(200).json({ success: true, data: user})
      })
      .catch(err => {
        return res.status(400).json({ success: false, error: err, })
      })
  }

  getUserByIp = async (req, res) => {
    await User
      .findOne({ ip: req.params.ip }, (err, user) => {
        if (err) {
          return res.status(400).json({ success: false, error: err, })
        }
        if (!user) {
          return res.status(404).json({ success: false, error: 'User not found', })
        }
        return res.status(200).json({ success: true, data: user})
      })
      .catch(err => {
        return res.status(400).json({ success: false, error: err, })
      })
  }

  getUsers = async (req, res) => {
    await User
      .find({}, (err, users) => {
        if (err) {
          return res.status(400).json({ success: false, error: err, })
        }
        if (!users.length) {
          return res.status(404).json({ success: false, error: 'Users not found', })
        }
        return res.status(200).json({ success: true, data: users})
      })
      .catch(err => {
        return res.status(400).json({ success: false, error: err, })
      })
  }

  return {
    createUser,
    updateUserById,
    deleteUserById,
    getUserById,
    getUserByEmail,
    getUserByName,
    getUserByIp,
    getUsers,
  }

}
