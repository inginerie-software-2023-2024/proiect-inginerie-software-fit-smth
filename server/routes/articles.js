import express from "express";
import { addArticle, addArticleComment, getAllArticles, getArticle, getArticleComments } from "../controllers/articles.js";

const router = express.Router()

router.get('/getArticles', getAllArticles)
router.get('/:id', getArticle)
router.get('/articleComments/:id', getArticleComments)
router.post('/add', addArticle)
router.post('/addComment', addArticleComment)

export default router;