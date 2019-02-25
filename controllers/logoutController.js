/**
 * Module for logoutController
 *
 * @author Niklas Nilsson
 * @version 1.0
 */

const logoutController = {}

/**
 * logout POST
 */
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
