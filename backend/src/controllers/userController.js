// controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient'); // from your prismaClient.js

// Cookie options for HTTP-only cookie
const cookieOptions = {
  httpOnly: true, // can't be accessed from JS (XSS protection)
  secure: process.env.NODE_ENV === 'production', // Set secure=true in production
  sameSite: 'strict', // CSRF mitigation
  maxAge: 24 * 60* 60* 1000 // 1 day in milliseconds
};

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1) Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // 2) Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // 3) Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4) Create user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // 5) Generate JWT
    const token = jwt.sign(
      { userId: newUser.id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // 1 day token
    );

    // 6) Set cookie
    res.cookie('jwt', token, cookieOptions);

    // 7) return success
    return res.status(201).json({
       message: 'User created successfully',
       user: {id: newUser.id, email: newUser.email, role: newUser.role } 
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Set cookie
    res.cookie('jwt', token, cookieOptions);

    // return success
    return res.json({
      message: 'Logged in successfully',
      user: { id: user.id, email: user.email, role: user.role }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  // Clear the JWT cookie
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'strict', secure: false });
  return res.json({ message: 'Logged out' });
};

// Example for retrieving logged-in user's profile
exports.getProfile = async (req, res) => {
  try {
    // req.user is set by authMiddleware
    const userId = req.user.userId;
    // Retrieve user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, role: true, createdAt: true }, // exclude password
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
