// middlewares/validateSchema.js
const { z } = require('zod');

const validateSchema = (schema) => (req, res, next) => {
    try {
      // Parse throws if invalid
      schema.parse({
        body: req.body,
        query: req.query
      });
      next();
    } catch (error) {
      // ZodError format
      return res.status(400).json({ error: error.errors });
    }
  };


const userSignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 chars'),
});
  
  module.exports = {
    validateSchema,
    userSignupSchema,
  };
  