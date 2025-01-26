// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const validateSchema = require('../middlewares/validateSchema');
const { userSignupSchema } = require('../validation/userSchemas');

router.post('/signup', validateSchema(userSignupSchema), userController.signup);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;
