import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get('/api/admin/dashboard');
                setStats(response.data.stats);
                setRecentOrders(response.data.recentOrders);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Failed to load dashboard data.');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

            <section className="mb-8">
                <h2 className="text-xl font-semibold">Statistics</h2>
                <p>Total Orders: {stats._count.id}</p>
                <p>Total Revenue: ${stats._sum.totalPrice.toFixed(2)}</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold">Recent Orders</h2>
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Order ID</th>
                            <th className="border border-gray-300 px-4 py-2">User</th>
                            <th className="border border-gray-300 px-4 py-2">Total Price</th>
                            <th className="border border-gray-300 px-4 py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map(order => (
                            <tr key={order.id}>
                                <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{order.user.email}</td>
                                <td className="border border-gray-300 px-4 py-2">${order.totalPrice.toFixed(2)}</td>
                                <td className="border border-gray-300 px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default AdminDashboard;