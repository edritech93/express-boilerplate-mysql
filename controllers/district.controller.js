const db = require('../models')
const District = db.district
const { DATA_NOT_FOUND } = require('../constants')

exports.getDistrict = (req, res) => {
  District.findAll({})
    .then(data => {
      res.status(200).send(data)
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message || DATA_NOT_FOUND
      })
    })
}

exports.addDistrict = (req, res) => {
  District.create(req.body)
    .then(() => {
      res.status(200).send({ message: 'District Berhasil Ditambahkan' })
    })
    .catch(error => {
      res.status(400).send({
        message: error.message || INPUT_FAILED
      })
    })
}

exports.editDistrict = (req, res) => {
  const { districtId } = req.params
  District.update(req.body, {
    where: { id: districtId }
  })
    .then(() => {
      res.status(200).send({ message: 'District Berhasil Diubah' })
    })
    .catch(error => {
      res.status(400).json({
        message: error.message || DATA_NOT_FOUND
      })
    })
}

exports.deleteDistrict = (req, res) => {
  const { districtId } = req.params
  District.destroy({ where: { id: districtId } })
    .then(() => {
      res.status(200).send({ message: 'District Berhasil Dihapus' })
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message || DATA_NOT_FOUND
      })
    })
}
