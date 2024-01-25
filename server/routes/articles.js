import express from "express";
import { getAllArticles, getArticle, getArticleComments } from "../controllers/articles.js";

const router = express.Router()

router.get('/getArticles', getAllArticles)
router.get('/:id', getArticle)
router.get('/articleComments/:id', getArticleComments)

export default router;