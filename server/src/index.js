import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://product-catalog-three-xi.vercel.app/",
    ],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    project: "Product Browser API",
    endpoints: {
      products: "/api/products",
      stats: "/api/products/stats",
    },
  });
});

app.use("/api/products", productRoutes);

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});