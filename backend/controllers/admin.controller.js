import InventoryItem from '../models/InventoryItem.js';
import Order from '../models/Order.js';
import { body, validationResult } from 'express-validator';

// @desc    Get all inventory items
// @route   GET /api/admin/inventory
// @access  Private/Admin
export const getInventory = async (req, res) => {
  try {
    const inventory = await InventoryItem.find({}).sort({ category: 1, name: 1 });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update inventory item
// @route   PUT /api/admin/inventory/:id
// @access  Private/Admin
export const updateInventory = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('price').optional().isNumeric().withMessage('Price must be a number'),
  body('stock').optional().isNumeric().withMessage('Stock must be a number'),
  body('threshold').optional().isNumeric().withMessage('Threshold must be a number'),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, price, stock, threshold } = req.body;

      const item = await InventoryItem.findById(req.params.id);

      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }

      if (name) item.name = name;
      if (price !== undefined) item.price = price;
      if (stock !== undefined) item.stock = stock;
      if (threshold !== undefined) item.threshold = threshold;

      const updatedItem = await item.save();
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = [
  body('status')
    .isIn(['Received', 'In Kitchen', 'Sent to Delivery', 'Delivered'])
    .withMessage('Invalid status'),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { status } = req.body;

      const order = await Order.findById(req.params.id)
        .populate('userId', 'name email');

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      order.status = status;
      const updatedOrder = await order.save();

      // ✅ CORRECT WAY (inside function)
      const io = req.app.get('io');
      if (io) {
        io.to(order.userId._id.toString()).emit('orderStatusUpdate', {
          orderId: order._id,
          status: order.status,
          timestamp: new Date()
        });
      }

      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];