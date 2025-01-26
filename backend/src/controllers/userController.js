// controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient'); // from your prismaClient.js

// Cookie options for HTTP-only cookie
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // Set secure=true in production
  sameSite: 'strict',
};

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Generate JWT
    const token = jwt.sign(
      { userId: newUser.id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // 1 day token
    );

    // Set cookie
    res.cookie('jwt', token, cookieOptions);

    return res.status(201).json({ message: 'User created', userId: newUser.id });
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

    // Find user
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

    return res.json({ message: 'Logged in successfully', userId: user.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  // Clear the JWT cookie
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'strict', secure: false });
  return res.json({ message: 'Logged out' });
};

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
