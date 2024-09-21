const express = require('express')
const { authMiddleware } = require('../middlewares/auth')
const { getBalance, transfer } = require('../controllers/account')
const router = express.Router()


router.get('/balance', authMiddleware, getBalance)
router.post('/transfer',authMiddleware, transfer)

module.exports = router