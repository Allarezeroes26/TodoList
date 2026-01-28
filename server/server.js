const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config()
const db = require('./utils/db');
const connectDB = require('./utils/db');
const userRoutes = require('./routes/userRoutes')
const cookieParser = require('cookie-parser')

const port = process.env.PORT || 5003;

connectDB()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('/api/auth', userRoutes)

app.listen(port, () => {
    console.log(`Server running in port ${port}`)
})