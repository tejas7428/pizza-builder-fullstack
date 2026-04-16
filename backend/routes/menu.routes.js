import express from 'express';
const router = express.Router();
import { getMenu } from '../controllers/menu.controller.js';
import { protect } from '../middleware/auth.js';

router.get('/', protect, getMenu);

export default router;