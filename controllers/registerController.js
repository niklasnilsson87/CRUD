const User = require('../models/User')

const registerController = {}

registerController.register = (req, res, next) => res.render('register/index')

registerController.registerUser = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    })

    await newUser.save()

    req.session.flash = { type: 'success', text: 'To-do item was created successfully.' }
    res.redirect('.')
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('./create')
  }
}

module.exports = registerController