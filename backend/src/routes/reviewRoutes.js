// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public: get reviews for a specific product
router.get('/:productId', reviewController.getReviewsForProduct);

// Create a review (logged-in user)
router.post('/:productId', authMiddleware, reviewController.createReview);

// Update a review (owner or admin)
router.put('/:productId/:reviewId', authMiddleware, reviewController.updateReview);

// Delete a review (owner or admin)
router.delete('/:productId/:reviewId', authMiddleware, reviewController.deleteReview);

module.exports = router;
