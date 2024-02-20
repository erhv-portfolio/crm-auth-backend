import express from 'express'
import { getUsers } from '../controllers/userController.js'

const router = express.Router()

// area privada, requiere JWT
router.get('/', getUsers)

export default router
