// backend/controllers/order_controller.js

import Order from '../models/order.model.js';

// ✅ CREATE ORDER
export const createOrder = async (req, res, next) => {
  try {
    const { items, totalAmount, userId } = req.body;

    const order = await Order.create({
      items,
      totalAmount,
      user: userId
    });

    // ✅ Emit using app.get('io')
    const io = req.app.get('io');
    if (io) {
      io.to(userId).emit('orderPlaced', order);
    }

    res.status(201).json({
      success: true,
      order
    });

  } catch (error) {
    next(error);
  }
};


// ✅ GET USER ORDERS
export const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {
    next(error);
  }
};


// ✅ GET SINGLE ORDER
export const getOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      order
    });

  } catch (error) {
    next(error);
  }
};


// ✅ UPDATE ORDER STATUS (ADMIN)
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // ✅ Emit update
    const io = req.app.get('io');
    if (io) {
      io.to(order.user.toString()).emit('orderUpdated', order);
    }

    res.status(200).json({
      success: true,
      order
    });

  } catch (error) {
    next(error);
  }
};