const User = require('../models/userModel');
const generateToken = require('../utils/token');
const bcrypt = require('bcrypt')


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }

        const user = await User.findOne({ email }).select('+password')

        if (!user) {
            return res.status(401).json({ success: false, message: "Email not found" })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "Password doesn't match!" })
        }

        generateToken(user._id, res)
        res.status(200).json({ success: true, message: 'Login Success' })


    } catch (err) {
        console.log("Login failed", err)
        res.status(500).json({ success: false, message: "Login Failed" })
    }
}

const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }

        if (password.length < 8) {
            return res.status(400).json({success: false, message: "Password is too short!, 8 or more characters is needed!"})
        }

        const user = await User.findOne({ email })

        if (user) return res.status(409).json({ success: false, message: "Account already exists!, Select input a new email!" })

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save()
            res.status(201).json({ success: true, message: "Register Success" })
        }
    } catch (err) {
        console.log('Internal Server Error (register)', err)
        res.status(500).json({ success: false, message: "Register Failed" })
    }
}

const logout = (req, res) => {
    try {
        res.cookie("token", "", { maxAge: 0 })
        res.status(200).json({ success: true, message: "Logged out successfully" })
    } catch (err) {
        console.log('Logout failed', err)
        res.status(500).json({ success: false, message: "Logout failed" })
    }
}

module.exports = { login, register, logout }
