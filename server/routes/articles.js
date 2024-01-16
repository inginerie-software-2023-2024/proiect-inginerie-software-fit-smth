import express from "express";
import { getAllArticles } from "../controllers/articles.js";

const router = express.Router()

router.get('/getArticles', getAllArticles)

export default router;