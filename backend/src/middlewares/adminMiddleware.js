// middlewares/adminMiddleware.js

const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden: Admins only.' });
    }
    next();
  };
  
  module.exports = adminMiddleware;
  