// routes/orderRoutes.js
const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Create a new order (any logged-in user)
router.post('/', authMiddleware, orderController.createOrder);

// Get my orders (logged-in user)
router.get('/my-orders', authMiddleware, orderController.getMyOrders);

// Admin only
router.get('/', authMiddleware, adminMiddleware, orderController.getAllOrders);
router.get('/:id', authMiddleware, orderController.getOrderById); // user or admin can access, logic in controller
router.put('/:id/status', authMiddleware, adminMiddleware, orderController.updateOrderStatus);

module.exports = router;
