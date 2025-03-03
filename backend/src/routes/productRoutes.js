// routes/productRoutes.js
const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const { validateSchema } = require('../middlewares/validateSchema');
const { createProductSchema } = require('../validation/productSchemas');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Admin-only routes
router.post(
    '/',
    authMiddleware,
    adminMiddleware,
    validateSchema(createProductSchema),
    productController.createProduct
);
router.put('/:id', authMiddleware, adminMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, productController.deleteProduct);

module.exports = router;
