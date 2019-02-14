// mongodb+srv://Niklas:<PASSWORD>@cluster0-qd92s.mongodb.net/test?retryWrites=true

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const cookieAuthentication = require('./lib/middleware/cookieAuthentication')
const routes = require('./routes/')
const mongoose = require('./config/mongoose')

const app = express()

// connect to the database
mongoose.connect().catch(error => {
  console.error(error)
  process.exit(1)
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.set('view engine', 'pug')

app.use('/', cookieAuthentication, routes)

app.listen(3000, () => console.log('listening on port 3000....'))
