import { register, login } from '../controllers/auth.controller.js';
import User from '../models/User.js';

// Mock dependencies
jest.mock('../models/User.js');
jest.mock('jsonwebtoken');
jest.mock('nodemailer');
jest.mock('crypto');

describe('Auth Controller', () => {
  describe('register', () => {
    it('should register a new user successfully', async () => {
      // Mock request and response objects
      const req = {
        body: {
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          phone: '1234567890'
        }
      };
      
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      
      // Mock User.findOne to return null (user doesn't exist)
      User.findOne.mockResolvedValue(null);
      
      // Mock User.create to return a user object
      User.create.mockResolvedValue({
        _id: 'user123',
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890'
      });
      
      // Call the register function
      await register[register.length - 1](req, res); // Get the actual handler function
      
      // Assertions
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User registered successfully. Please check your email to verify your account.'
      });
    });
    
    it('should return error if user already exists', async () => {
      // Mock request and response objects
      const req = {
        body: {
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        }
      };
      
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      
      // Mock User.findOne to return a user (user already exists)
      User.findOne.mockResolvedValue({ email: 'test@example.com' });
      
      // Call the register function
      await register[register.length - 1](req, res);
      
      // Assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
    });
  });
  
  describe('login', () => {
    it('should login user successfully', async () => {
      // Mock request and response objects
      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123'
        }
      };
      
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        cookie: jest.fn()
      };
      
      // Mock user object with comparePassword method
      const mockUser = {
        _id: 'user123',
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
        emailVerified: true,
        comparePassword: jest.fn().mockResolvedValue(true),
        save: jest.fn()
      };
      
      // Mock User.findOne to return the mock user
      User.findOne.mockResolvedValue(mockUser);
      
      // Call the login function
      await login[login.length - 1](req, res);
      
      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
      expect(res.json.mock.calls[0][0]).toHaveProperty('_id');
      expect(res.json.mock.calls[0][0]).toHaveProperty('name');
      expect(res.json.mock.calls[0][0]).toHaveProperty('email');
      expect(res.json.mock.calls[0][0]).toHaveProperty('role');
    });
    
    it('should return error for invalid credentials', async () => {
      // Mock request and response objects
      const req = {
        body: {
          email: 'test@example.com',
          password: 'wrongpassword'
        }
      };
      
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      
      // Mock user object with comparePassword method returning false
      const mockUser = {
        emailVerified: true,
        comparePassword: jest.fn().mockResolvedValue(false)
      };
      
      // Mock User.findOne to return the mock user
      User.findOne.mockResolvedValue(mockUser);
      
      // Call the login function
      await login[login.length - 1](req, res);
      
      // Assertions
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
    });
  });
});