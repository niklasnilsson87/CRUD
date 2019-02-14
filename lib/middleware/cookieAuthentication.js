module.exports = (req, res, next) => {
  if (req.cookies.username || req.originalUrl === '/hello') {
    next()
  } else {
    res.redirect('/hello')
  }
}
