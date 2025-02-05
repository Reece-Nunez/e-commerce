import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import PropTypes from 'prop-types';

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

ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;