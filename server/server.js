import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.get("/api", (req, res) => {
  res.json("from backend-side");
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
