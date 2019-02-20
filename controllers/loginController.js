
const User = require('../models/User')

const loginController = {}

loginController.login = (req, res, next) => res.render('login/index')

loginController.loginUser = async (req, res) => {
  let user = await User.findOne({ username: req.body.username })
  if (!user) {
    console.log('no user')
  }

  let result = await user.comparePassword(req.body.password)
  if (result && user) {
    let sess = req.session
    sess.username = req.body.username
    sess.id = req.sessionID

    await sess.save()
    req.session.flash = { type: 'success', text: 'login was successfull.' }
    res.redirect('.')
  } else {
    res.render('home/index')
  }
}
module.exports = loginController
