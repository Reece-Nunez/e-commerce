import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

function SalesChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="createdAt" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="_sum.totalPrice" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
}

SalesChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        createdAt: PropTypes.string.isRequired,
        _sum: PropTypes.shape({
            totalPrice: PropTypes.number.isRequired,
        }).isRequired,
    })).isRequired,
};

export default SalesChart;