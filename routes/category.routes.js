module.exports = app => {
  const controller = require('../controllers/category.controller.js')
  const router = require('express').Router()

  router.post('/', controller.addCategory)
  router.put('/:categoryId', controller.editCategory)
  router.delete('/:categoryId', controller.deleteCategory)

  app.use('/api/category', router)
}
