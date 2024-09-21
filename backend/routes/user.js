const express = require('express')
const router = express.Router()
const {register, login, update, filterBy} = require('../controllers/user.js')
const {authMiddleware} = require('../middlewares/auth.js')

router.get('/bulk',filterBy)
router.post('/signin', login)
router.post('/signup', register)
router.put('/',authMiddleware, update)

module.exports =  router