import express from 'express';
const router = express.Router();
import { createOrder, getOrder, getUserOrders } from '../controllers/order.controller.js';
import { protect } from '../middleware/auth.js';

router.route('/')
  .post(protect, createOrder)
  .get(protect, getUserOrders);

router.route('/:id')
  .get(protect, getOrder);

export default router;