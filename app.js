/**
 * The starting point of the application.
 *
 * @author Niklas Nilsson
 * @version 1.0
 */

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
require('dotenv').config()
const hbs = require('express-hbs')
const session = require('express-session')
const logger = require('morgan')

const middlewereHome = require('./lib/middleware/middlewares')
const mongoose = require('./config/mongoose')

const app = express()

// connect to the database
mongoose.connect().catch(error => {
  console.error(error)
  process.exit(1)
})

// Configure rendering engine, with change extension to .hbs.
app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}))

// Setup view engine.
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// additional middleware for logger and bodyparser
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// Setup session store with the given options.
const sessionOptions = {
  name: 'zlatan',
  secret: 'hej det här är roligt',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: 'lax'
  }
}

app.use(session(sessionOptions))

// middleware to be executed before the routes
// saves the session to locals object
app.use((req, res, next) => {
  if (req.session && req.session.username) {
    res.session = { username: req.session.username }
    res.locals.username = req.session.username
  }
  next()
})

// flash messages - survives only a round trip
app.use((req, res, next) => {
  res.locals.flash = req.session.flash
  delete req.session.flash

  next()
})

// routes
app.use('/', require('./routes/homeRouter'))
app.use('/todo', require('./routes/toDoRouter.js'))
app.use('/login', middlewereHome.redirectHome, require('./routes/loginRouter.js'))
app.use('/register', middlewereHome.redirectHome, require('./routes/registerRouter.js'))
app.use('/logout', require('./routes/logoutRouter.js'))

// Error handler
app.use((req, res, next) => {
  res.status(404)
  res.sendFile(path.join(__dirname, 'public', '404.html'))
})

app.use((err, req, res, next) => {
  if (err.message === '403') {
    res.status(403)
    res.sendFile(path.join(__dirname, 'public', '403.html'))
  } else {
    res.status(err.status || 500)
    res.send(err.message || 'internal Server Error')
  }
})

// Start listening.
app.listen(3000, () => console.log('listening on port 3000....'))
