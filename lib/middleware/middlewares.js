/**
 * Middleweres module.
 *
 * @author Niklas Nilsson
 * @version 1.0
 */

// Checks if there is a user that is logged in.
const redirectHome = (req, res, next) => {
  if (req.session.username) {
    res.redirect('/')
  } else {
    next()
  }
}

// Checks if there isnt a user logged in.
const userExist = (req, res, next) => {
  if (!req.session.username) {
    throw new Error('403')
  } else {
    next()
  }
}

// Exports
module.exports = {
  redirectHome: redirectHome,
  userExist: userExist
}
