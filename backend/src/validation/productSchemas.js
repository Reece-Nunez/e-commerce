// validation/productSchemas.js
const { z } = require('zod');

const createProductSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
  price: z.number().positive(),
  brand: z.string().optional(),
  categoryId: z.number().int().positive(),
});

module.exports = {
  createProductSchema,
};
