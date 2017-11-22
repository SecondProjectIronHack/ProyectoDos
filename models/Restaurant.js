const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const restaurantSchema = new Schema({
  name: {type: String, require: true},
  address: {type: String, require: true},
  website: {type: String, require: true},
  phone: {type: String},
  type: {type: String, require: true},
  rating: { type: Schema.Types.ObjectId, ref: 'Rating', required: false },
  visited: {type: Boolean, default: false},
  creator: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  time : { type : Date, default: Date.now }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
