import express from 'express';
import { getFood } from '../controllers/food.js';

const router = express.Router()

router.get('', getFood)

export default router;