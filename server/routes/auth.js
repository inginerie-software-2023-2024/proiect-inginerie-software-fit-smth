import express from "express";
import {RegisterSendVerification, login, logout, verifyMail, forgetpassword, changepassword} from "../controllers/auth.js"


const router = express.Router()

router.post('/register', RegisterSendVerification)
router.post('/login', login)
router.post('/logout', logout)
router.post('/verify-mail', verifyMail)
router.post('/forgetpassword', forgetpassword);
router.post('/changepassword', changepassword);

export default router;