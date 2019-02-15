const router = require('express').Router()

const hello = require('./hello')
const root = require('./root')
const card = require('./create')

router.route('/hello')
  .get(hello.renderHello)
  .post(hello.setUser)

router.route('/create')
  .get(card.cardsHomepage)

router.route('/')
  .get(root.renderHomePage)

module.exports = router
