import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Import routes
import authRoutes from './routes/auth.routes.js';
import menuRoutes from './routes/menu.routes.js';
import orderRoutes from './routes/order.routes.js';
import adminRoutes from './routes/admin.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import healthRoutes from './routes/health.routes.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';

// Initialize app
const app = express();

// ✅ FIX 1: TRUST PROXY (IMPORTANT FOR RENDER)
app.set('trust proxy', 1);

const server = createServer(app);

// Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(helmet());

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Make io available to routes
app.set('io', io);


// ================= ROUTES =================

// ✅ FIX 2: REMOVE /api PREFIX (MATCH FRONTEND)
app.use('/auth', authRoutes);
app.use('/menu', menuRoutes);
app.use('/orders', orderRoutes);
app.use('/admin', adminRoutes);
app.use('/payments', paymentRoutes);
app.use('/health', healthRoutes);


// Error handler
app.use(errorHandler);


// ================= DATABASE =================

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));


// ================= SERVER =================

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { io };