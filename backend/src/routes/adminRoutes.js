const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middlewares/roleMiddleware');
const { getAdminDashboard } = require('../controllers/adminController');

// Only allow admins and managers to access this route
router.get('/dashboard', roleMiddleware(['ADMIN', 'MANAGER']), getAdminDashboard);

module.exports = router;