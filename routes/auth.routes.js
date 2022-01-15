module.exports = app => {
  const controller = require('../controllers/auth.controller.js')
  const router = require('express').Router()

  router.post('/register', controller.register)
  router.post('/login', controller.login)

  app.use('/api/auth', router)
}
