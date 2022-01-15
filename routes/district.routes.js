module.exports = app => {
  const controller = require('../controllers/district.controller.js')
  const router = require('express').Router()

  router.get('/', controller.getDistrict)
  router.post('/', controller.addDistrict)
  router.put('/:districtId', controller.editDistrict)
  router.delete('/:districtId', controller.deleteDistrict)

  app.use('/api/district', router)
}
