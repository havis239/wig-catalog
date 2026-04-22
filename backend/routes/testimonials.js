const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');

// @route   GET /api/testimonials
// @desc    Get all testimonials
// @access  Public
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/testimonials
// @desc    Add a testimonial (Mocking for now or for admin use)
// @access  Public (should be Protected in production)
router.post('/', async (req, res) => {
  const testimonial = new Testimonial({
    name: req.body.name,
    role: req.body.role,
    content: req.body.content,
    rating: req.body.rating,
    image: req.body.image
  });

  try {
    const newTestimonial = await testimonial.save();
    res.status(201).json(newTestimonial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
