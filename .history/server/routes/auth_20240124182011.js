import express from "express";
<<<<<<< HEAD
import { register, login, logout } from "../controllers/auth.js"
=======
import {RegisterSendVerification, login, logout, verifyMail, forgetpassword, changepassword} from "../controllers/auth.js"
>>>>>>> origin/login-register


const router = express.Router()

router.post('/register', RegisterSendVerification)
router.post('/login', login)
router.post('/logout', logout)
router.post('/verify-mail', verifyMail)
router.post('/forgetpassword', forgetpassword);
router.post('/changepassword', changepassword);

export default router;