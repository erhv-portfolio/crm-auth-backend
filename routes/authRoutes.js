import express from 'express'
import { register, verifyAccount, login, user, forgotPassword, verifyPasswordResetToken, updatePassword, admin, checkToken } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

// rutas de autenticación y registro de usuarios
router.post('/register', register)
router.get('/verify/:token', verifyAccount)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)

router.route('/forgot-password/:token')
    .get(verifyPasswordResetToken)
    .post(updatePassword)

// area privada, requiere JWT
router.get('/user', authMiddleware, user)
router.get('/admin', authMiddleware, admin)
router.get('/check-token', authMiddleware, checkToken)

export default router