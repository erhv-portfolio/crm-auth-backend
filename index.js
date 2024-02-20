import express from "express"
import dotenv from "dotenv"
import colors from 'colors'
import cors from 'cors'
import { db } from "./config/db.js"
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import prospectoRoutes from './routes/prospectoRoutes.js'

// Variables de entorno
dotenv.config()

// configurar la app
const app = express()

// leer datos via body
app.use(express.json())

// Conectar a BD
db()

// Configurar CORS
const withelist = [process.env.FRONTEND_URL]
if(process.argv[2] === '--postman') {
    withelist.push(undefined)
}

console.log('WHITELIST:', withelist);
const corsOptions = {
    origin: function(origin, callback) {
        if(withelist.includes(origin)) {
            // Permite la conexión
            callback(null, true)
        } else {
            // No permitir la conexión
            callback(new Error('error de CORS'))
        }
    }
}

//app.use(cors(corsOptions))
app.use(cors())

// Definir rutas
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/prospectos', prospectoRoutes)


// Definir puerto
const PORT = process.env.PORT || 4000

// Arrancar la app
app.listen(PORT, () => {
    console.log(colors.blue('el servidor se está ejecutando en el puerto:', PORT))
})

