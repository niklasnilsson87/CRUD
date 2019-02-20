const redirectHome = (req, res, next) => {
  if (req.session.username) {
    res.redirect('/')
  } else {
    next()
  }
}

const userExist = (req, res, next) => {
  if (!req.session.username) {
    res.redirect('/')
  } else {
    next()
  }
}

module.exports = {
  redirectHome: redirectHome,
  userExist: userExist
}
