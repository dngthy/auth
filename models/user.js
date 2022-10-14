const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  id: String,
  username: String,
  password: String,
  email: String,
  picture: {
    data: {
      url: String
    }
  },
  displayName: String,
  createAt: Date,
  ip: String,
  location: [Object],
  currentDevice: [Object],
  name: {
    familyName: String,
    givenName: String,
    middleName: String
  },
  gender: String,
  quotes: String,
  birthday: String
})

module.exports = mongoose.model('User', userSchema)
