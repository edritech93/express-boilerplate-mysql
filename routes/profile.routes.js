module.exports = app => {
  const controller = require('../controllers/profile.controller.js')
  const router = require('express').Router()

  router.get('/', controller.getProfile)
  router.put('/', controller.editProfile)

  app.use('/api/profile', router)
}
