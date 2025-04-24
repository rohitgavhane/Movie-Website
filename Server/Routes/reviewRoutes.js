const express = require('express');
const router4 = express.Router();
const Review = require('../Models/reviews');

// POST: Add a review
router4.post('/add', async (req, res) => {
  try {
    const { movieId, text } = req.body;
    if (!movieId || !text) {
      return res.status(400).json({ error: 'movieId and text are required' });
    }
    const newReview = new Review({ movieId, text });
    await newReview.save();
    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Failed to add review' });
  }
});

// GET: Reviews by movieId
router4.get('/get/:movieId', async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// DELETE: Delete review by ID
router4.delete('/delete/:id', async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

module.exports = router4;
