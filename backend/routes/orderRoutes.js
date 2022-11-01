import express from "express";

import { addOrderItems, updateOrderToPaid, getOrderById, getMyOrders } from '../controller/orderController.js';
import { protect } from '../middleware/authMiddleware.js'
const router = express();

router.route('/').post(protect, addOrderItems)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)

router.route('/:id/pay').put(protect, updateOrderToPaid)


export default router; 