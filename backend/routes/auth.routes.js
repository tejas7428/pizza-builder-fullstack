import express from 'express';
const router = express.Router();
import { register, login, logout, verifyEmail, forgotPassword, resetPassword } from '../controllers/auth.controller.js';

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;