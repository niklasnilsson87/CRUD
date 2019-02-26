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
    }
  })
}

// Exports.
module.exports = logoutController
