import express from 'express'
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import connectionRoutes from './routes/connection.route.js'
import notificationRoutes from './routes/notification.route.js'
import postRoutes from './routes/post.route.js'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/posts', postRoutes)
app.use('/api/v1/notifications', notificationRoutes)
app.use('/api/v1/connections', connectionRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
    connectDB()
})