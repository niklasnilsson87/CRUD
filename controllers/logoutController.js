'use strict'

const logoutController = {}

/**
 * index GET
 */
logoutController.logout = (req, res, next) => {
  req.session.destroy(error => {
    if (error) {
      console.log(error)
    } else {
      res.clearCookie('scrud')
      res.redirect('/')
      console.log('loggar ut')
    }
  })
}

// Exports.
module.exports = logoutController
