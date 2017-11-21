const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const restaurantSchema = new Schema({
  name: {type: String, require: true},
  address: {type: String, require: true},
  website: {type: String, require: true},
  telephone: {type: String, require: true},
  type: {type: String, require: true},
  rating:

  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)
module.exports = Restaurant
