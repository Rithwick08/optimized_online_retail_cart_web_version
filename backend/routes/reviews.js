const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Review = require('../models/Review');

// Create a review
router.post('/', async (req, res) => {
  try {
    const { productId, review, rating } = req.body;
    const newReview = new Review({ productId, review, rating });
    await newReview.save();
    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add review' });
  }
});

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('productId');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

module.exports = router;