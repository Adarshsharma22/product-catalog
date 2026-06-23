import express from 'express';
import {getProducts, getStats, getCategories} from '../controllers/productController.js';

const router = express.Router();

router.get("/stats", getStats);
router.get("/", getProducts);
router.get("/categories", getCategories);


export default router;