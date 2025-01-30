const prisma = require('../src/prismaClient');

async function seed() {
  try {
    // Step 1: Delete products first to prevent foreign key constraint issues
    await prisma.product.deleteMany();

    // Delete existing data
    await prisma.category.deleteMany();

    // Seed categories
    await prisma.category.createMany({
      data: [
        { id: 1, name: "Electronics" },
        { id: 2, name: "Gaming" },
        { id: 3, name: "Mobile Phones" },
      ],
    });
    

    // Seed products
    await prisma.product.createMany({
      data: [
        {
          name: "Wireless Headphones",
          description: "High-quality over-ear headphones with noise cancellation.",
          price: 120.99,
          brand: "AudioTech",
          imageURL: "/assets/products/wireless_headphones.jpg",
          categoryId: 1, // Matches the Electronics category
        },
        {
          name: "Gaming Mouse",
          description: "Ergonomic mouse with programmable buttons and RGB lighting.",
          price: 49.99,
          brand: "TechGear",
          imageURL: "/assets/products/gaming_mouse.jpg",
          categoryId: 2, // Matches the Gaming category
        },
        {
          name: "Smartphone",
          description: "Latest model smartphone with high-resolution display and dual cameras.",
          price: 699.99,
          brand: "PhoneTech",
          imageURL: "/assets/products/smartphone.jpg",
          categoryId: 3, // Matches the Mobile Phones category
        },
        {
          name: "4K Monitor",
          description: "Ultra HD monitor with stunning color accuracy.",
          price: 299.99,
          brand: "DisplayPro",
          imageURL: "/assets/products/gaming_monitor.jpg",
          categoryId: 1, // Matches the Electronics category
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
