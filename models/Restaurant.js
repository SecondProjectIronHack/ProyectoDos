const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ratingSchema = new Schema({
  food: {type: Number,required: true},
  price: {type: Number,required: true},
  ambience: {type: Number,required: true},
  comment: String,
  creator: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  photo: String,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const Rating = mongoose.model('Rating', ratingSchema)
module.exports = Rating
