// controllers/reviewController.js
const prisma = require('../prismaClient');

// Create a new review (must be logged in)
exports.createReview = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params; // route: /api/reviews/:productId
    const { rating, comment } = req.body;

    if (!rating) {
      return res.status(400).json({ error: 'Rating is required' });
    }

    // Optional: ensure the product exists first, or rely on foreign key constraints
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId, 10) },
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const newReview = await prisma.review.create({
      data: {
        rating: parseInt(rating, 10),
        comment,
        productId: product.id,
        userId: userId,
      },
    });

    return res.status(201).json(newReview);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all reviews for a specific product
exports.getReviewsForProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await prisma.review.findMany({
      where: { productId: parseInt(productId, 10) },
      include: {
        user: {
          select: { email: true, role: true }, // or any user fields you want to display
        },
      },
    });
    return res.json(reviews);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update a review (only the user who wrote it or admin)
exports.updateReview = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userRole = req.user.role;
    const { productId, reviewId } = req.params;
    const { rating, comment } = req.body;

    // Find existing review
    const existingReview = await prisma.review.findUnique({
      where: { id: parseInt(reviewId, 10) },
    });
    if (!existingReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Check ownership or admin
    if (existingReview.userId !== userId && userRole !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const updatedReview = await prisma.review.update({
      where: { id: parseInt(reviewId, 10) },
      data: {
        rating: rating ? parseInt(rating, 10) : undefined,
        comment: comment ?? undefined, // Use ?? in case comment is empty string
      },
    });

    return res.json(updatedReview);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Review not found' });
    }
    return res.status(500).json({ error: error.message });
  }
};

// Delete a review (only the user who wrote it or admin)
exports.deleteReview = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userRole = req.user.role;
    const { productId, reviewId } = req.params;

    // Find existing review
    const existingReview = await prisma.review.findUnique({
      where: { id: parseInt(reviewId, 10) },
    });
    if (!existingReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Check ownership or admin
    if (existingReview.userId !== userId && userRole !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await prisma.review.delete({
      where: { id: parseInt(reviewId, 10) },
    });

    return res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Review not found' });
    }
    return res.status(500).json({ error: error.message });
  }
};
