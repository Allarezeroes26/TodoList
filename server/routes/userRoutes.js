const express = require('express')
const router = express.Router()
const { login, register, logout, checkAuth } = require('../controllers/userControllers')
const authUpdate = require('../middleware/authMiddleware')

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.get('/check', authUpdate ,checkAuth)

module.exports = router