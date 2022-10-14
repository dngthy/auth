const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const connectDB = require('./mongo-db/connect-db')
connectDB()

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

const usersRouter = require('./routes/auth')

app.use('/auth', usersRouter)

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Auth repository service is listening on ${port}`)
})
