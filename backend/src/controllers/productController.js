// controllers/productController.js

const prisma = require('../prismaClient');

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, brand, categoryId } = req.body;

    // Basic validation
    if (!name || !description || !price || !categoryId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        brand,
        categoryId: parseInt(categoryId, 10),
      },
    });

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true }, // If you want to show category data
    });
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id, 10) },
      include: { category: true },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, brand, categoryId } = req.body;

    const updated = await prisma.product.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        description,
        price: price ? parseFloat(price) : undefined,
        brand,
        categoryId: categoryId ? parseInt(categoryId, 10) : undefined,
      },
    });

    return res.json(updated);
  } catch (error) {
    if (error.code === 'P2025') {
      // "Record to update not found."
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id: parseInt(id, 10) },
    });
    return res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(500).json({ error: error.message });
  }
};
