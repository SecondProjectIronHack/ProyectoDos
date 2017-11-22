const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const userSchema = new Schema({
  username: {type: String, require: true},
  fullName: {type: String, require: true},
  email: {type: String, require: true},
  password: {type: String, require: true},
  pic_path: String,
  pic_name: String,
  birthday : Date,
  gender: String,
  location: String,
  complete : {type: Boolean, default: false}
})

const User = mongoose.model('User', userSchema)
module.exports = User
