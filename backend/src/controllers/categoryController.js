// controllers/categoryController.js
const prisma = require('../prismaClient');

exports.createCategory = async (req, res) => {
  try {
    const { name, parentCategoryId } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    // parentCategoryId is optional, so if it's provided, parseInt it
    const parentId = parentCategoryId ? parseInt(parentCategoryId, 10) : null;

    const newCategory = await prisma.category.create({
      data: {
        name,
        parentCategoryId: parentId,
      },
    });

    return res.status(201).json(newCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    // Optionally include children or parent for hierarchical structure
    const categories = await prisma.category.findMany({
      include: {
        children: true,
        parent: true,
      },
    });
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        children: true,
        parent: true,
      },
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    return res.json(category);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, parentCategoryId } = req.body;

    const parentId = parentCategoryId ? parseInt(parentCategoryId, 10) : null;

    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        parentCategoryId: parentId,
      },
    });

    return res.json(updatedCategory);
  } catch (error) {
    if (error.code === 'P2025') {
      // Record not found
      return res.status(404).json({ error: 'Category not found' });
    }
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.category.delete({
      where: { id: parseInt(id, 10) },
    });

    return res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Category not found' });
    }
    return res.status(500).json({ error: error.message });
  }
};
