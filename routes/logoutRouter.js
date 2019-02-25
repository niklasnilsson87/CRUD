/**
 * Logout routes.
 *
 * @author Niklas Nilsson
 * @version 1.0
 */

const express = require('express')
const router = express.Router()

const controller = require('../controllers/logoutController')

// POST /
router.post('/', controller.logout)

// Exports
module.exports = router
