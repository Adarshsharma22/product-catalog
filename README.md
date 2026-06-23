# Product Catamog API & Dashboard

A full-stack product Catalog application built with **Node.js, Express, PostgreSQL, Prisma, React, and Vite**. The project efficiently handles **200,000+ products** with high-performance cursor-based pagination, category filtering, and consistent browsing even while product data is being updated.

---

## Live Demo

| Layer | URL |
|---|---|
| 🌐 **Frontend** | [product-catalog-three-xi.vercel.app](https://product-catalog-three-xi.vercel.app) |
| ⚙️ **Backend API** | [product-catalog-api-wzqy.onrender.com](https://product-catalog-api-wzqy.onrender.com) |

```

---

## Project Overview

This project was built to solve the challenge of browsing a large product catalog while maintaining:

* Fast pagination
* Efficient database queries
* Consistent results during concurrent data changes
* Scalable architecture for large datasets

The application generates and stores **200,000 products** and allows users to:

* Browse products
* Filter by category
* Load products using cursor-based pagination
* View total product count

---

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* Prisma ORM

### Database

* PostgreSQL (Neon)

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: Neon PostgreSQL

---

## Features

### Product Browsing

* Browse products sorted by newest updates first
* Display product name, category, price, and updated date

### Category Filtering

* Filter products by category
* Dynamic category retrieval from database

### Cursor-Based Pagination

* High-performance pagination
* No OFFSET/LIMIT pagination
* Scales efficiently with large datasets

### Statistics

* Total product count endpoint
* Product category endpoint

### Production Features

* Database indexing
* Health check endpoint
* API documentation route
* Deployed backend and frontend

---

## Why Cursor Pagination?

Traditional pagination using OFFSET becomes slower as data grows and can lead to duplicate or missing records when new data is inserted.

Example:

```sql
SELECT *
FROM products
ORDER BY updated_at DESC
LIMIT 20 OFFSET 100;
```

Problems:

* Duplicate records
* Missing records
* Poor performance on large datasets

Instead, this project uses Keyset (Cursor) Pagination.

Products are sorted by:

```sql
ORDER BY updated_at DESC, id DESC
```

Cursor Example:

```json
{
  "updatedAt": "2026-06-23T10:15:30.000Z",
  "id": "abc123"
}
```

Benefits:

* No duplicates
* No missing records
* Consistent browsing experience
* Faster queries
* Better scalability

---

## Database Schema

### Product

| Field     | Type     |
| --------- | -------- |
| id        | UUID     |
| name      | String   |
| category  | String   |
| price     | Float    |
| createdAt | DateTime |
| updatedAt | DateTime |

---

## Database Indexes

To support efficient pagination:

```sql
CREATE INDEX idx_products_browse
ON products(updated_at DESC, id DESC);

CREATE INDEX idx_products_category_browse
ON products(category, updated_at DESC, id DESC);
```

These indexes significantly improve query performance for large datasets.

---

## Seed Data

A dedicated seed script generates **200,000 products**.

Each product includes:

* Unique ID
* Product Name
* Category
* Price
* Created Timestamp
* Updated Timestamp

The script uses batch inserts for high performance instead of inserting records one by one.

Run:

```bash
npm run seed
```

---

## API Endpoints

### API Documentation

```http
GET /
```

Returns available endpoints.

---

### Health Check

```http
GET /health
```

Response:

```json
{
  "status": "ok"
}
```

---

### Get Products

```http
GET /api/products
```

---

### Get Products with Pagination

```http
GET /api/products?cursorUpdatedAt=<timestamp>&cursorId=<id>
```

---

### Filter by Category

```http
GET /api/products?category=Electronics
```

---

### Get Product Statistics

```http
GET /api/products/stats
```

Response:

```json
{
  "totalProducts": 200000
}
```

---

### Get Categories

```http
GET /api/products/categories
```

Response:

```json
[
  {
    "category": "Electronics"
  },
  {
    "category": "Books"
  }
]
```

---

## Project Structure

```text
product-catalog/

├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   ├── scripts/
│   │   └── seedProducts.js
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── lib/
│   │   └── index.js
│   │
│   ├── package.json
│   └── .env.example
│
└── README.md
```

---

## Running Locally

### Clone Repository

```bash
git clone <repository-url>
cd product-catalog
```

---

### Backend Setup

```bash
cd server

npm install
```

Create:

```env
DATABASE_URL=your_neon_database_url
PORT=3000
```

Push schema:

```bash
npx prisma db push
```

Generate Prisma Client:

```bash
npx prisma generate
```

Seed Database:

```bash
npm run seed
```

Run Backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd client

npm install

npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:3000
```

---

## Performance Considerations

* Cursor-based pagination
* Database indexing
* Batch data insertion
* PostgreSQL query optimization
* Efficient filtering
* Scalable architecture

The application is designed to efficiently handle large datasets while maintaining a consistent user experience.

---


## Author

**Adarsh Sharma**

Full Stack Developer

* React.js
* Node.js
* Express.js
* PostgreSQL
* Prisma
* MongoDB
* Tailwind CSS

---

## License

This project is created for educational and assessment purposes.
