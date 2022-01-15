const db = require('../models')
const Product = db.product
const Profile = db.profile
const Category = db.category
const Op = db.Sequelize.Op
const { DATA_NOT_FOUND } = require('../constants')

exports.getProduct = (req, res) => {
  const { search } = req.query
  const condition = search ? { productName: { [Op.like]: `%${search}%` } } : null
  Product.findAll({ where: condition })
    .then(data => {
      res.status(200).send(data)
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message || DATA_NOT_FOUND
      })
    })
}

exports.getProductUser = (req, res) => {
  const { userId } = req.user.dataValues
  Product.findAll({ where: { userId } })
    .then(data => {
      res.status(200).send(data)
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message || DATA_NOT_FOUND
      })
    })
}

exports.getProductDetail = (req, res) => {
  const { productId } = req.params
  Product.findByPk(productId, {
    include: [
      { model: Profile, as: 'seller' },
      { model: Category, as: 'category' }
    ]
  })
    .then(data => {
      res.status(200).send(data)
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message || DATA_NOT_FOUND
      })
    })
}

exports.addProduct = (req, res) => {
  const { userId } = req.user.dataValues
  Product.create({ ...req.body, userId })
    .then(() => {
      res.status(200).send({ message: 'Produk Berhasil Ditambahkan' })
    })
    .catch(error => {
      res.status(400).send({
        message: error.message || INPUT_FAILED
      })
    })
}

exports.editProduct = (req, res) => {
  const { productId } = req.params
  Product.update(req.body, {
    where: { id: productId }
  })
    .then(() => {
      res.status(200).send({ message: 'Produk Berhasil Diubah' })
    })
    .catch(error => {
      res.status(400).json({
        message: error.message || DATA_NOT_FOUND
      })
    })
}

exports.deleteProduct = (req, res) => {
  const { productId } = req.params
  Product.destroy({ where: { id: productId } })
    .then(() => {
      res.status(200).send({ message: 'Produk Berhasil Dihapus' })
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message || DATA_NOT_FOUND
      })
    })
}
