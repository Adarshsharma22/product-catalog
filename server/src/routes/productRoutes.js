import express from 'express';
import {getProducts, getStats} from '../controllers/productController.js';

const router = express.Router();

router.get("/stats", getStats);
router.get("/", getProducts);



export default router;