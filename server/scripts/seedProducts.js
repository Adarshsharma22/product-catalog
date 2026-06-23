import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const TOTAL_PRODUCTS = 200000;
const BATCH_SIZE = 5000;

const categories = [
  "Electronics",
  "Books",
  "Fashion",
  "Sports",
  "Home",
  "Beauty",
  "Toys",
  "Automotive",
];

async function seed() {
  console.log("Starting seed...");

  for (let i = 0; i < TOTAL_PRODUCTS; i += BATCH_SIZE) {
    const products = Array.from({ length: BATCH_SIZE }, () => ({
      name: faker.commerce.productName(),

      category:
        categories[
          Math.floor(Math.random() * categories.length)
        ],

      price: Number(
        faker.commerce.price({
          min: 100,
          max: 50000,
        })
      ),

      createdAt: faker.date.past(),

      updatedAt: faker.date.recent(),
    }));

    await prisma.product.createMany({
      data: products,
    });

    console.log(
      `Inserted ${Math.min(
        i + BATCH_SIZE,
        TOTAL_PRODUCTS
      )} products`
    );
  }

  console.log("200,000 products created successfully");
}

seed()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });