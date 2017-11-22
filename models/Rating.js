const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  creator: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  restaurant: {type: Schema.Types.ObjectId, ref: 'Restaurant', required: true},
  food: {type: Number,required: true},
  price: {type: Number,required: true},
  ambience: {type: Number,required: true},
  customerService: {type: Number,required: true},
  customerService: {type: String,required: true},
  comment: String,
  pic_path: String,
  pic_name: String,
  time : { type : Date, default: Date.now }
});

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;
