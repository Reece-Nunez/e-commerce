import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useAuth();

    if (!user) {
        console.log('Redirecting to login - user not authenticated');
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(user.role)) {
        console.log('Redirecting to unauthorized page - insufficient permissions');
        return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;