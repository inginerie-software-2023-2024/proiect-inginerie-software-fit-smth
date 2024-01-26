import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.js";
import articlesRoutes from "./routes/articles.js";
const app = express()

app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/articles",articlesRoutes);

app.get('/api', (req, res) => {
    res.json(
       "from backend-side"
    );
})

app.listen(3001, () => {
    console.log("Server started on port 3001")
})