import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const mockMenu = {
  bases: [
    { id: '1', name: 'Thin Crust', price: 150, stock: 100 },
    { id: '2', name: 'Thick Crust', price: 160, stock: 100 },
    { id: '3', name: 'Cheese Burst', price: 200, stock: 80 },
    { id: '4', name: 'Whole Wheat', price: 170, stock: 90 },
    { id: '5', name: 'Stuffed Crust', price: 220, stock: 70 }
  ],
  sauces: [
    { id: '1', name: 'Tomato Basil', price: 30, stock: 200 },
    { id: '2', name: 'BBQ Sauce', price: 40, stock: 150 },
    { id: '3', name: 'Pesto', price: 50, stock: 120 },
    { id: '4', name: 'Alfredo', price: 45, stock: 130 },
    { id: '5', name: 'Spicy Marinara', price: 35, stock: 180 }
  ],
  cheeses: [
    { id: '1', name: 'Mozzarella', price: 60, stock: 300 },
    { id: '2', name: 'Cheddar', price: 55, stock: 250 },
    { id: '3', name: 'Parmesan', price: 70, stock: 200 },
    { id: '4', name: 'Feta', price: 65, stock: 180 },
    { id: '5', name: 'Blue Cheese', price: 80, stock: 150 }
  ],
  veggies: [
    { id: '1', name: 'Bell Peppers', price: 25, stock: 200 },
    { id: '2', name: 'Onions', price: 20, stock: 250 },
    { id: '3', name: 'Mushrooms', price: 30, stock: 180 },
    { id: '4', name: 'Olives', price: 35, stock: 150 },
    { id: '5', name: 'Tomatoes', price: 20, stock: 220 },
    { id: '6', name: 'Spinach', price: 25, stock: 180 },
    { id: '7', name: 'Jalapeños', price: 30, stock: 160 },
    { id: '8', name: 'Artichokes', price: 40, stock: 120 }
  ],
  meats: [
    { id: '1', name: 'Pepperoni', price: 70, stock: 150 },
    { id: '2', name: 'Chicken', price: 80, stock: 140 },
    { id: '3', name: 'Ham', price: 75, stock: 130 },
    { id: '4', name: 'Sausage', price: 85, stock: 120 },
    { id: '5', name: 'Bacon', price: 90, stock: 110 },
    { id: '6', name: 'Ground Beef', price: 95, stock: 100 }
  ]
};

const mockUsers = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin', emailVerified: true },
  { id: '2', name: 'Sample User', email: 'user@example.com', role: 'user', emailVerified: true }
];

const mockOrders = [
  { id: '1', userId: '2', items: [], total: 0, status: 'Received', paid: false }
];

// Mock authentication endpoints
app.post('/api/auth/register', (req, res) => {
  res.json({ message: 'User registered successfully' });
});

app.post('/api/auth/login', (req, res) => {
  res.json({ 
    token: 'mock-jwt-token',
    refreshToken: 'mock-refresh-token',
    user: mockUsers[1]
  });
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

app.get('/api/auth/verify-email', (req, res) => {
  res.json({ message: 'Email verified successfully' });
});

app.post('/api/auth/forgot-password', (req, res) => {
  res.json({ message: 'Password reset email sent' });
});

app.post('/api/auth/reset-password', (req, res) => {
  res.json({ message: 'Password reset successfully' });
});

// Mock menu endpoint
app.get('/api/menu', (req, res) => {
  res.json(mockMenu);
});

// Mock order endpoints
app.post('/api/orders', (req, res) => {
  res.json({ 
    id: '2', 
    userId: '2', 
    items: req.body.items, 
    total: req.body.total, 
    status: 'Received', 
    paid: true 
  });
});

app.get('/api/orders', (req, res) => {
  res.json(mockOrders);
});

app.get('/api/orders/:id', (req, res) => {
  res.json(mockOrders[0]);
});

// Mock admin endpoints
app.get('/api/admin/inventory', (req, res) => {
  res.json(mockMenu);
});

app.put('/api/admin/inventory/:id', (req, res) => {
  res.json({ message: 'Inventory updated successfully' });
});

app.get('/api/admin/orders', (req, res) => {
  res.json(mockOrders);
});

app.put('/api/admin/orders/:id/status', (req, res) => {
  res.json({ message: 'Order status updated successfully' });
});

// Mock payment endpoints
app.post('/api/payments/create-order', (req, res) => {
  res.json({ 
    id: 'order_mock123',
    currency: 'INR',
    amount: req.body.amount
  });
});

app.post('/api/payments/verify-payment', (req, res) => {
  res.json({ message: 'Payment verified successfully' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Mock server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Mock server running on port ${PORT}`);
});