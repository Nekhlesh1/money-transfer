const express = require("express");
const app = express()

const db = require('./db.js')
const mainRouter = require('./routes/index.js')
const cors = require('cors')

app.use(cors())
app.use(express.json())


app.use('/api/v1', mainRouter)


app.listen(process.env.PORT, () =>
{
    console.log(`Listening to port ${process.env.PORT}`)
})


