'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/toDoController')
const user = require('../lib/middleware/middlewares')

// GET /
router.get('/', controller.index)

// GET, POST /create
router.route('/create')
  .get(user.userExist, controller.create)
  .post(controller.createPost)

// GET, POST /edit
router.get('/edit/:id', user.userExist, controller.edit)
router.post('/edit', controller.editPost)

// GET, POST  /delete
router.get('/delete/:id', user.userExist, controller.delete)
router.post('/delete', controller.deletePost)

// Exports.
module.exports = router
