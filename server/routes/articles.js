import express from "express";
import { addArticle, addArticleComment, deleteArticle, deleteComment, getAllArticles, getArticle, getArticleComments } from "../controllers/articles.js";

const router = express.Router()

router.get('/getArticles', getAllArticles)
router.get('/:id', getArticle)
router.get('/articleComments/:id', getArticleComments)
router.post('/add', addArticle)
router.post('/addComment', addArticleComment)
router.delete('/deleteArticle/:id', deleteArticle)
router.delete('/deleteComment/:id', deleteComment)

export default router;