/**
 * Login routes.
 *
 * @author Niklas Nilsson
 * @version 1.0
 */

const express = require('express')
const router = express.Router()

const controller = require('../controllers/loginController')

// GET / POST /
router
  .get('/', controller.login)
  .post('/', controller.loginUser)

// Exports
module.exports = router
