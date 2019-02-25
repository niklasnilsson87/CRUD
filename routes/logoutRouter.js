const express = require('express')
const router = express.Router()

const controller = require('../controllers/logoutController')

router.post('/', controller.logout)

module.exports = router