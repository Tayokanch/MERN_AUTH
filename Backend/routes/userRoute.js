import express from "express";
import { signUp, login, verifyToken, getUser, refreshToken, logOut } from "../controller/userController.js";
const router = express.Router();

router.post('/signup', signUp)
router.post('/login', login)
router.get('/user',verifyToken, getUser)
router.get('/refresh', refreshToken, verifyToken, getUser )
router.post('/logout', verifyToken, logOut)
export default router