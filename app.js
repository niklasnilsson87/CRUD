
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
require('dotenv').config()
const hbs = require('express-hbs')
const session = require('express-session')
const logger = require('morgan')

const cookieAuthentication = require('./lib/middleware/cookieAuthentication')
const routes = require('./routes/old_js')
const mongoose = require('./config/mongoose')

const app = express()

// connect to the database
mongoose.connect().catch(error => {
  console.error(error)
  process.exit(1)
})

// view engine setup
app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// additional middleware
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// setup and use session middleware (https://github.com/expressjs/session)
const sessionOptions = {
  name: 'name of keyboard cat', // Don't use default session cookie name.
  secret: 'hej det här är roligt', // Change it!!! The secret is used to hash the session with HMAC.
  resave: false, // Resave even if a request is not changing the session.
  saveUninitialized: false, // Don't save a created but not modified session.
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}

app.use(session(sessionOptions))

// middleware to be executed before the routes
app.use((req, res, next) => {
  if (req.session && req.session.username) {
    res.session = { username: req.session.username }
    res.locals.username = req.session.username
  }
  next()
})

app.use((req, res, next) => {
  // flash messages - survives only a round trip
  res.locals.flash = req.session.flash
  delete req.session.flash

  next()
})

// routes
app.use('/', require('./routes/homeRouter'))
app.use('/todo', require('./routes/toDoRouter.js'))
app.use('/login', require('./routes/loginRouter.js'))
app.use('/register', require('./routes/registerRouter.js'))
app.use('/logout', require('./routes/logoutRouter.js'))

// Error handler
app.use((req, res, next) => {
  res.status(404)
  res.sendFile(path.join(__dirname, 'public', '404.html'))
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err.message || 'internal Server Error')
})

app.listen(3000, () => console.log('listening on port 3000....'))
