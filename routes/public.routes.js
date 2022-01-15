module.exports = app => {
  const controllerProduct = require('../controllers/product.controller.js')
  const routerProduct = require('express').Router()
  routerProduct.get('/', controllerProduct.getProduct)
  routerProduct.get('/:productId', controllerProduct.getProductDetail)
  app.use('/api/public/product', routerProduct)

  const controllerAttachment = require('../controllers/attachment.controller.js')
  const routerAttachment = require('express').Router()
  routerAttachment.post('/upload', controllerAttachment.addAttachment)
  app.use('/api/public/attachment', routerAttachment)

  const controllerCategory = require('../controllers/category.controller.js')
  const routerCategory = require('express').Router()
  routerCategory.get('/', controllerCategory.getCategory)
  app.use('/api/public/category', routerCategory)
}
