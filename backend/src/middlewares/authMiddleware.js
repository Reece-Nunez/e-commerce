// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Cookies are parsed by cookie-parser, so req.cookies should exist
    const token = req.cookies.jwt; 
    if (!token) {
      return res.status(401).json({ error: 'No token provided.' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to req.user
    req.user = decoded; 

    next();
  } catch (error) {
    console.error('Auth Error:', error);
    return res.status(401).json({ error: 'Unauthorized.' });
  }
};

module.exports = authMiddleware;
