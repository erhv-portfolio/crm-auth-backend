import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const authMiddleware = async (req, res, next) => {
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // agregamos el user al Request de nuestras peticiones
            req.user = await User.findById(decoded.id).select("-password -verified -token -__v")
            // esto para el frontend de Angular
            req.sessionToken = token

            next()
        } catch {
            const error = new Error('Token no válido')
            res.status(403).json({msg: error.message})
        }

    } else {
        const error = new Error('Token no válido o inexistente')
        res.status(403).json({msg: error.message})
    }

}

export default authMiddleware