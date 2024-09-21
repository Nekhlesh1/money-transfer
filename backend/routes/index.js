const express = require('express')
const router = express.Router()
const userRouter = require('./user.js')
const accountRouter = require('./account.js')

router.use('/user', userRouter)
router.use('/account', accountRouter)
module.exports = router





// t2  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmVkY2U0MjNkNjczMmE3NzY3Mjk5OWQiLCJpYXQiOjE3MjY4NjA5NDF9.PaSnzNR16l5YUDfmSARc9a0NDpWmjuLfCJZp5sBBCoY