const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient'); // Prisma client instance

// Enhanced logging function
function logAuthEvent(message, data = {}) {
    const timestamp = new Date().toISOString();
    console.log(`[AUTH LOG] ${timestamp} - ${message}`, data);
}

// Middleware to authenticate and authorize based on roles
const roleMiddleware = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            const token = req.cookies.jwt;

            if (!token) {
                logAuthEvent('Unauthorized access attempt - no token provided', { path: req.path });
                return res.status(401).json({ error: 'No token provided.' });
            }

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            logAuthEvent('Token verified successfully', { userId: decoded.userId, role: decoded.role });

            // Check if user role is allowed
            if (!allowedRoles.includes(decoded.role)) {
                logAuthEvent('Access denied - insufficient permissions', { userId: decoded.userId, role: decoded.role });
                return res.status(403).json({ error: 'Access denied.' });
            }

            // Fetch additional user details from database (optional)
            const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
            if (!user) {
                logAuthEvent('User not found in database', { userId: decoded.userId });
                return res.status(404).json({ error: 'User not found.' });
            }

            logAuthEvent('User authorized successfully', { userId: user.id, email: user.email });
            next();
        } catch (error) {
            logAuthEvent('Authorization error', { error: error.message, stack: error.stack });
            return res.status(401).json({ error: 'Unauthorized access.' });
        }
    };
};

module.exports = roleMiddleware;