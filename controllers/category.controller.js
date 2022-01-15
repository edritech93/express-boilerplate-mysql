const db = require('../models')
const Category = db.category
const { DATA_NOT_FOUND } = require('../constants')

exports.getCategory = (req, res) => {
  Category.findAll({})
    .then(data => {
      res.status(200).send(data)
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message || DATA_NOT_FOUND
      })
    })
}

exports.addCategory = (req, res) => {
  const { userId } = req.user.dataValues
  Category.create({ ...req.body, userId })
    .then(() => {
      res.status(200).send({ message: 'Kategori Berhasil Ditambahkan' })
    })
    .catch(error => {
      res.status(400).send({
        message: error.message || INPUT_FAILED
      })
    })
}

exports.editCategory = (req, res) => {
  const { categoryId } = req.params
  Category.update(req.body, {
    where: { id: categoryId }
  })
    .then(() => {
      res.status(200).send({ message: 'Kategori Berhasil Diubah' })
    })
    .catch(error => {
      res.status(400).json({
        message: error.message || DATA_NOT_FOUND
      })
    })
}

exports.deleteCategory = (req, res) => {
  const { categoryId } = req.params
  Category.destroy({ where: { id: categoryId } })
    .then(() => {
      res.status(200).send({ message: 'Kategori Berhasil Dihapus' })
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message || DATA_NOT_FOUND
      })
    })
}
