const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Review = require('../models/Review');

// POST /api/reviews - Add a review
router.post('/', async (req, res) => {
  try {
    const { productId, username, comment, rating } = req.body;

    if (!productId || !username || !comment || !rating) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newReview = new Review({
      productId,
      username,
      review: comment, // Save comment as "review"
      rating
    });

    await newReview.save();

    res.status(201).json({
      message: 'Review added successfully',
      review: newReview
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add review' });
  }
});

// GET /api/reviews - Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('productId');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// ✅ NEW: GET /api/reviews/:productId - Get reviews for a specific product
router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId }).populate('productId');

    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch reviews for the product' });
  }
});

module.exports = router;
