const cookieHandler = {
  setCookie: (req, res) => res.cookie('username', req.body.username)
}

const renderHello = (req, res) => {
  res.render('hello', { name: req.cookies.username })
}

const setUser = (req, res) => {
  cookieHandler.setCookie(req, res)
  res.redirect('/')
}

module.exports = {
  renderHello,
  setUser
}
