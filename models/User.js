const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const userSchema = new Schema({
  name: {type: String, require: true},
  email: {type: String, require: true},
  password: {type: String, require: true},
  // timestamps: {
  //   createdAt: 'created_at',
  //   updatedAt: 'updated_at'
  // }
})

const User = mongoose.model('User', userSchema)
module.exports = User
