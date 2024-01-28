import express from "express";
const router = express.Router();
import { getProfile, updateProfile } from "../controllers/profileController.js";

router.get("/:username", getProfile);
router.put("/update/:username", updateProfile);

export default router;
