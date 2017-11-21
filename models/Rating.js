const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Los timestamps no se por que no funcionan 

const ratingSchema = new Schema({
  creator: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  restaurant: {type: Schema.Types.ObjectId, ref: 'Restaurant', required: true},
  food: {type: Number,required: true},
  price: {type: Number,required: true},
  ambience: {type: Number,required: true},
  customerService: {type: Number,required: true},
  comment: String,
  photo: String
  // timestamps: {
  //   createdAt: 'created_at',
  //   updatedAt: 'updated_at'
  // }
})

const Rating = mongoose.model('Rating', ratingSchema)
module.exports = Rating
