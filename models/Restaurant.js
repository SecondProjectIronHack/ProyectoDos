const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const restaurantSchema = new Schema({
  name: {type: String, require: true},
  address: {type: String, require: true},
  website: {type: String, require: true},
  type: {type: String, require: true},
  rating: { type: Schema.Types.ObjectId, ref: 'Rating', required: false },
  // timestamps: {
  //   createdAt: 'created_at',
  //   updatedAt: 'updated_at'
  // }
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)
module.exports = Restaurant
