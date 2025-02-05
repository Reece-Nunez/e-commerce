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
