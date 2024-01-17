import express from "express";
import { getAllArticles, getArticle } from "../controllers/articles.js";

const router = express.Router()

router.get('/getArticles', getAllArticles)
router.get('/:id', getArticle)

export default router;