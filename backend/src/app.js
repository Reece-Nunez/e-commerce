const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', // Adjust if your React dev server runs on 3000
  credentials: true, // so cookies can be sent
}));

// Test route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the E-commerce Backend!" });
});

module.exports = app;
