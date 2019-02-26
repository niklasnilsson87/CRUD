/**
 * Module for logoutController
 *
 * @author Niklas Nilsson
 * @version 1.0
 */

const User = require('../models/User')

const registerController = {}

/**
 * register GET
 */
registerController.register = (req, res, next) => res.render('register/index')

/**
 * registerUser POST
 */
registerController.registerUser = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    })

    await newUser.save()

    req.session.flash = { type: 'success', text: 'New user was created successfully.' }
    res.redirect('/login')
  } catch (error) {
    req.session.flash = { type: 'danger', text: 'Username already exist' }
    res.redirect('./login')
  }
}

// Exports
module.exports = registerController
