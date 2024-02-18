import express from 'express';
import { addUserMeal, getFood, getUserMeals } from '../controllers/food.js';

const router = express.Router()

router.get('', getFood);
router.post('/addMeal', addUserMeal);
router.get('/getUserMeals/:username', getUserMeals);

export default router;