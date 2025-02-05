const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middlewares/roleMiddleware');
const { getAdminDashboard, getSalesTrends, getRecentUsers, updateOrderStatus, createPaymentIntent } = require('../controllers/adminController');

router.get('/dashboard', roleMiddleware(['ADMIN', 'MANAGER']), getAdminDashboard);
router.get('/sales-trends', roleMiddleware(['ADMIN']), getSalesTrends);
router.get('/recent-users', roleMiddleware(['ADMIN']), getRecentUsers);
router.put('/orders/:orderId/status', roleMiddleware(['ADMIN', 'MANAGER']), updateOrderStatus);
router.post('/create-payment-intent', roleMiddleware(['USER']), createPaymentIntent);

module.exports = router;