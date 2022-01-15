module.exports = app => {
  const controller = require('../controllers/product.controller.js')
  const router = require('express').Router()

  router.get('/', controller.getProductUser)
  router.post('/', controller.addProduct)
  router.put('/:productId', controller.editProduct)
  router.delete('/:productId', controller.deleteProduct)

  app.use('/api/product', router)
}
