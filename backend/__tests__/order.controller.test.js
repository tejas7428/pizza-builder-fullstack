import { createOrder } from '../controllers/order.controller.js';
import Order from '../models/Order.js';
import InventoryItem from '../models/InventoryItem.js';

// Mock dependencies
jest.mock('../models/Order.js');
jest.mock('../models/InventoryItem.js');

describe('Order Controller', () => {
  describe('createOrder', () => {
    it('should create a new order successfully', async () => {
      // Mock request and response objects
      const req = {
        user: { _id: 'user123' },
        body: {
          items: [
            { _id: 'item1', name: 'Base', qty: 1, price: 150 },
            { _id: 'item2', name: 'Sauce', qty: 1, price: 30 }
          ],
          total: 180,
          paymentId: 'payment123'
        }
      };
      
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      
      // Mock Order.save to return a created order
      const mockOrder = {
        _id: 'order123',
        userId: 'user123',
        items: req.body.items,
        total: 180,
        paymentId: 'payment123',
        paid: true,
        save: jest.fn().mockResolvedValue({
          _id: 'order123',
          userId: 'user123',
          items: req.body.items,
          total: 180,
          paymentId: 'payment123',
          paid: true
        })
      };
      
      Order.mockImplementation(() => mockOrder);
      
      // Mock InventoryItem.findOneAndUpdate to return updated items
      InventoryItem.findOneAndUpdate.mockResolvedValue({
        _id: 'item1',
        name: 'Base',
        stock: 99,
        threshold: 20
      });
      
      // Call the createOrder function
      await createOrder[createOrder.length - 1](req, res);
      
      // Assertions
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    });
    
    it('should return error if insufficient stock', async () => {
      // Mock request and response objects
      const req = {
        user: { _id: 'user123' },
        body: {
          items: [
            { _id: 'item1', name: 'Base', qty: 1, price: 150 }
          ],
          total: 150,
          paymentId: 'payment123'
        }
      };
      
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      
      // Mock Order.save to return a created order
      const mockOrder = {
        _id: 'order123',
        save: jest.fn().mockResolvedValue({ _id: 'order123' })
      };
      
      Order.mockImplementation(() => mockOrder);
      
      // Mock InventoryItem.findOneAndUpdate to return null (insufficient stock)
      InventoryItem.findOneAndUpdate.mockResolvedValue(null);
      
      // Mock Order.findByIdAndDelete
      Order.findByIdAndDelete.mockResolvedValue({});
      
      // Call the createOrder function
      await createOrder[createOrder.length - 1](req, res);
      
      // Assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Insufficient stock for Base' });
    });
  });
});