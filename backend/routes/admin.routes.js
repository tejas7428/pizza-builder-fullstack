import express from 'express';
const router = express.Router();
import { getInventory, updateInventory, getOrders, updateOrderStatus } from '../controllers/admin.controller.js';
import { protect, admin } from '../middleware/auth.js';

router.route('/inventory')
  .get(protect, admin, getInventory)
  .post(protect, admin, updateInventory);

router.route('/inventory/:id')
  .put(protect, admin, updateInventory);

router.route('/orders')
  .get(protect, admin, getOrders);

router.route('/orders/:id/status')
  .put(protect, admin, updateOrderStatus);

export default router;