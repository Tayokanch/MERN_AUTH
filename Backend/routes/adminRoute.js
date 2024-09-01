import express from 'express'
import { verifyToken } from '../controller/userController.js'
import { getAllUsers } from '../controller/adminController.js'
const router = express.Router()

router.use('/admin/getUsers', verifyToken, getAllUsers )

export default router