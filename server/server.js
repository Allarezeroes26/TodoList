const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config()
const connectDB = require('./utils/db');
const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')
const cookieParser = require('cookie-parser')

const port = process.env.PORT || 5003;

connectDB()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND,
    credentials: true
}))

app.use('/api/auth', userRoutes)
app.use('/api/tasks', taskRoutes)

app.listen(port, () => {
    console.log(`Server running in port ${port}`)
})