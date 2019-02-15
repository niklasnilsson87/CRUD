
const loginController = {}

loginController.login = (req, res, next) => res.render('login/index')

loginController.setUser = (req, res) => {
  console.log(req.sessionID)
  let sess = req.session
  sess.username = req.body.username
  sess.password = req.body.password
  console.log(sess)
  sess.save()
  res.redirect('/')
}
module.exports = loginController
