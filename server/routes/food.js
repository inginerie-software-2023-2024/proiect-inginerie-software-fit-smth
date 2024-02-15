import express from 'express';
import { addUserMeal, getFood } from '../controllers/food.js';

const router = express.Router()

router.get('', getFood)
router.post('/addMeal', addUserMeal)

export default router;