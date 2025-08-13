import express from 'express';
import { login, logout, registerUser, showLogin, showRegister } from "../controllers/authController.js";


const router = express.Router();

//Auth pages;
router.get('/signup',showRegister)
router.post('/register',registerUser)
router.get('/login',showLogin)
router.post('/login',login)
router.get('/logout',logout)
router.post('/logout',logout)


export default router;