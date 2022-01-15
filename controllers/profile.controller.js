const db = require('../models')
const Profile = db.profile
const Product = db.product
const { DATA_NOT_FOUND } = require('../constants')

exports.getProfile = (req, res) => {
  const { userId } = req.user.dataValues
  Profile.findOne({ where: { id: userId } })
    .then(data => {
      if (data) {
        if (data.isActive) {
          res.status(200).send(data)
        } else {
          res.status(400).json({
            message: 'Akun Anda belum aktif, minta Admin untuk mengaktifkan'
          })
        }
      } else {
        res.status(400).json({
          message: error.message || DATA_NOT_FOUND
        })
      }
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message || DATA_NOT_FOUND
      })
    })
}

exports.editProfile = (req, res) => {
  const { userId } = req.user.dataValues
  Profile.update(req.body, {
    where: { id: userId }
  })
    .then(() => {
      res.status(200).send({ message: 'Profil Berhasil Diubah' })
    })
    .catch(error => {
      res.status(400).json({
        message: error.message || DATA_NOT_FOUND
      })
    })
}
