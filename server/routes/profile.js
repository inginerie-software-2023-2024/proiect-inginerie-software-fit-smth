import express from "express";
const router = express.Router();
import { getProfile, updateProfile } from "../controllers/profileController.js";

router.get("/profile/:username", getProfile);
router.put("/profile/:username", updateProfile);

export default router;
