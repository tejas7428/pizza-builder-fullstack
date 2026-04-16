import express from 'express';
const router = express.Router();
import { createOrder, verifyPayment } from '../controllers/payment.controller.js';
import { protect } from '../middleware/auth.js';

router.post('/create-order', protect, createOrder);
router.post('/verify-payment', protect, verifyPayment);

export default router;