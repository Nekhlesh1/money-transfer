const { config } = require('dotenv')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(() =>
{
    console.log(`Connected to MongoDB Atlas`)
})
.catch((err =>
{
    console.log(err.message)
}
))
