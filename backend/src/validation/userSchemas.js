// validation/userSchemas.js
const { z } = require('zod');

const userSignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be 6 or more characters"),
});

module.exports = {
  userSignupSchema,
};
