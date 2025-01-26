// controllers/orderController.js
const prisma = require('../prismaClient');

// Create a new order with OrderItems
// Typically, you'd receive a list of items {productId, quantity, price} from the client.
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.userId; // from authMiddleware
    const { items } = req.body; // array of { productId, quantity, price }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'No items provided' });
    }

    // Calculate totalPrice (optional, you could also rely on front-end or further logic)
    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });

    // Create order and order items in a transaction
    const newOrder = await prisma.order.create({
      data: {
        userId,
        totalPrice: totalPrice,
        // items is a relation, so we create them via nested writes
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return res.status(201).json(newOrder);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all orders for an ADMIN
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,   // to see user info
        items: true,  // to see all order items
      },
    });
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get orders for the logged-in user
exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true, // if you want product info
          },
        },
      },
    });

    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get a specific order by ID (admin can view any, user can only view if it's theirs)
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const userRole = req.user.role;

    const order = await prisma.order.findUnique({
      where: { id: parseInt(id, 10) },
      include: { items: true },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // If user is not admin, ensure that order belongs to them
    if (userRole !== 'ADMIN' && order.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    return res.json(order);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update order status (admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // e.g., "SHIPPED", "DELIVERED", etc.

    const updated = await prisma.order.update({
      where: { id: parseInt(id, 10) },
      data: { status },
      include: { items: true },
    });

    return res.json(updated);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Order not found' });
    }
    return res.status(500).json({ error: error.message });
  }
};
