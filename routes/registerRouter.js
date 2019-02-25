/**
 * Register routes.
 *
 * @author Niklas Nilsson
 * @version 1.0
 */

const express = require('express')
const router = express.Router()

const controller = require('../controllers/registerController')

// GET / POST /
router
  .get('/', controller.register)
  .post('/', controller.registerUser)

// Exports
module.exports = router
