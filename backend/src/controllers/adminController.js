const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
exports.createPaymentIntent = async (req, res) => {
    try {
        const { amount, currency } = req.body;

        // Create a PaymentIntent with the specified amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            automatic_payment_methods: { enabled: true },
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'Failed to create payment intent.' });
    }
};

exports.getAdminDashboard = async (req, res) => {
    try {
        const stats = await prisma.order.aggregate({
            _count: { id: true },
            _sum: { totalPrice: true }
        });

        const recentOrders = await prisma.order.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' },
            include: { user: true, items: true }
        });

        res.json({ message: 'Welcome to the admin dashboard!', stats, recentOrders });
    } catch (error) {
        console.error('Error fetching admin dashboard:', error);
        res.status(500).json({ error: 'An error occurred.' });
    }
};

exports.getSalesTrends = async (req, res) => {
    try {
        const salesData = await prisma.order.groupBy({
            by: ['createdAt'],
            _sum: { totalPrice: true },
        });
        res.json(salesData);
    } catch (error) {
        console.error('Error fetching sales trends:', error);
        res.status(500).json({ error: 'An error occurred.' });
    }
};

exports.getRecentUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' }
        });
        res.json(users);
    } catch (error) {
        console.error('Error fetching recent users:', error);
        res.status(500).json({ error: 'An error occurred.' });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(orderId, 10) },
            data: { status }
        });

        res.json(updatedOrder);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'An error occurred.' });
    }
};