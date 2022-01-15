const db = require('../models')
const Auth = db.auth
const Profile = db.profile
const Helper = require('../constants/Helper')
const { DATA_NOT_FOUND, INPUT_FAILED, TIME_AGE_ACCESS_TOKEN, TIME_AGE_REFRESH_TOKEN, ROLE } = require('../constants')
const authService = require('../services/authorization')

exports.register = (req, res) => {
  const { phoneNumber, password } = req.body
  Profile.create(req.body)
    .then((data) => {
      const passwordHash = Helper.hashPassword(password)
      const body = {
        username: phoneNumber,
        password: passwordHash,
        userId: data.id
      }
      Auth.create(body)
        .then(() => {
          res.status(200).send({ message: 'Berhasil Mendaftar, Tunggu Admin mengaktifkan Akun Anda' })
        })
        .catch(error => {
          res.status(400).send({
            message: error.message || INPUT_FAILED
          })
        })
    })
    .catch(error => {
      res.status(400).send({
        message: error.message || INPUT_FAILED
      })
    })
}

exports.login = (req, res) => {
  const { username, password } = req.body
  Auth.findOne({ where: { username: username } })
    .then(data => {
      if (data && Helper.comparePassword(password, data.password)) {
        const accessToken = authService.setAccessToken({
          sessionData: data,
          maxAge: TIME_AGE_ACCESS_TOKEN
        })
        const refreshToken = authService.setRefreshToken({
          sessionData: data,
          maxAge: TIME_AGE_REFRESH_TOKEN
        })
        res.status(200).json({
          accessToken: accessToken,
          refreshToken: refreshToken
        })
      } else {
        res.status(400).json({
          message: DATA_NOT_FOUND
        })
      }
    })
    .catch(error => {
      res.status(400).send({
        message: error.message
      })
    })
}
