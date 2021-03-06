/**
 * Module for loginController
 *
 * @author Niklas Nilsson
 * @version 1.0
 */

const User = require('../models/User')

const loginController = {}

/**
 * index GET
 */
loginController.login = (req, res, next) => res.render('login/index')

/**
 * loginUser POST
 */
loginController.loginUser = async (req, res) => {
  let user = await User.findOne({ username: req.body.username })
  if (!user) {
    console.log('no user')
    req.session.flash = { type: 'danger', text: 'login failed check username & password' }
    res.redirect('./login')
  }

  // Checks if password match with DB
  let result = await user.comparePassword(req.body.password)
  if (result && user) {
    let sess = req.session
    sess.username = req.body.username
    sess.id = req.sessionID

    await sess.save()
    req.session.flash = { type: 'success', text: 'login was successfull.' }
    res.redirect('.')
  } else {
    req.session.flash = { type: 'danger', text: 'login failed check username & password' }
    res.redirect('./login')
  }
}

// Exports
module.exports = loginController
