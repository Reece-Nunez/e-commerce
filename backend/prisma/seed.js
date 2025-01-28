const prisma = require('../src/prismaClient');

async function seed() {
  try {
    await prisma.product.createMany({
      data: [
        {
          name: "Wireless Headphones",
          description: "High-quality over-ear headphones with noise cancellation.",
          price: 120.99,
          brand: "AudioTech",
          imageURL: "https://placehold.co/300x300",
          categoryId: 1, // Make sure this matches an existing category ID in your database
        },
        {
          name: "Gaming Mouse",
          description: "Ergonomic mouse with programmable buttons and RGB lighting.",
          price: 49.99,
          brand: "TechGear",
          imageURL: "https://placehold.co/300x300",
          categoryId: 2,
        },
        {
          name: "Smartphone",
          description: "Latest model smartphone with high-resolution display and dual cameras.",
          price: 699.99,
          brand: "PhoneTech",
          imageURL: "https://placehold.co/300x300",
          categoryId: 3,
        },
        {
          name: "4K Monitor",
          description: "Ultra HD monitor with stunning color accuracy.",
          price: 299.99,
          brand: "DisplayPro",
          imageURL: "https://placehold.co/300x300",
          categoryId: 1,
        },
      ],
    });

    console.log("Products seeded successfully!");
  } catch (err) {
    console.error("Error seeding products:", err);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
