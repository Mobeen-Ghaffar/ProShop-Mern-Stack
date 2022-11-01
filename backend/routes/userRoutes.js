import express from "express";

import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
import { authUser, registerUser, getUserProfile, updateUserProfile } from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js'
const router = express();



router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/').post(registerUser)


export default router; 