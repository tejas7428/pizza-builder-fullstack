import Order from '../models/Order.js';
import InventoryItem from '../models/InventoryItem.js';
import { body, validationResult } from 'express-validator';
import { io } from '../server.js';
import nodemailer from 'nodemailer';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = [
  body('items').isArray({ min: 1 }).withMessage('Items are required'),
  body('total').isNumeric().withMessage('Total is required'),
  
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { items, total, paymentId } = req.body;

      // Create order
      const order = new Order({
        userId: req.user._id,
        items,
        total,
        paymentId,
        paid: true
      });

      // Save order first
      const createdOrder = await order.save();

      // Update inventory atomically
      const inventoryUpdates = [];
      const lowStockItems = [];

      for (const item of items) {
        // Decrement stock atomically
        const updatedItem = await InventoryItem.findOneAndUpdate(
          { _id: item._id, stock: { $gte: item.qty } },
          { $inc: { stock: -item.qty } },
          { new: true }
        );

        if (!updatedItem) {
          // Rollback order if inventory update fails
          await Order.findByIdAndDelete(createdOrder._id);
          return res.status(400).json({ message: `Insufficient stock for ${item.name}` });
        }

        // Check if stock is below threshold
        if (updatedItem.stock < updatedItem.threshold) {
          lowStockItems.push(updatedItem);
        }
      }

      // Send low stock notifications if needed
      if (lowStockItems.length > 0) {
        await sendLowStockNotification(lowStockItems);
      }

      res.status(201).json(createdOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user is authorized to view this order
    if (order.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send low stock notification
const sendLowStockNotification = async (items) => {
  try {
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const itemList = items.map(item => 
      `${item.name} (${item.category}): ${item.stock} remaining (threshold: ${item.threshold})`
    ).join('\n');

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'Low Stock Alert',
      text: `The following items are below their threshold:

${itemList}

Please restock soon.`
    });
  } catch (error) {
    console.error('Low stock notification failed:', error);
  }
};