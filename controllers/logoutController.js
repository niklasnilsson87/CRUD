'use strict'

const logoutController = {}

logoutController.logout = (req, res, next) => {
  req.session.destroy(error => {
    if (error) {
      console.log(error)
    } else {
      res.clearCookie('zlatan')
      res.redirect('/')
      console.log('loggar ut')
    }
  })
}

// Exports.
module.exports = logoutController
