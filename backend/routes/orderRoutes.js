import express from "express";

import { addOrderItems } from '../controller/orderController.js';
import { protect } from '../middleware/authMiddleware.js'
const router = express();

router.route('/').post(protect, addOrderItems)


export default router; 