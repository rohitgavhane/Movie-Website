const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number, // Include rating
  },
}, { timestamps: true });


const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

module.exports = Review;
