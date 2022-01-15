'use strict'
const multer = require('multer')
const UUID = require('uuid')
const fs = require('fs')
const mime = require('mime-types')
const { INPUT_FAILED } = require('../constants')
const mainPath = './public/attachment/'

let filePath = null
let fileName = null

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    filePath = mainPath + 'kta'
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true })
    }
    cb(null, filePath)
  },
  filename: function (req, file, cb) {
    const ext = mime.extension(file.mimetype)
    fileName = `${UUID.v4()}.${ext}`
    cb(null, fileName)
  }
})

const upload = multer({ storage: storage })

exports.addAttachment = function (req, res) {
  const newUpload = upload.array('file', 10)
  newUpload(req, res, function (error) {
    if (error instanceof multer.MulterError) {
      res.status(500).json({
        message: 'Internal Server error'
      })
    } else if (error) {
      res.status(400).json({
        message: error.message || INPUT_FAILED
      })
    } else {
      if (filePath && fileName) {
        const attachmentUrl = filePath.substring(8) + '/' + fileName
        res.status(200).json({
          message: 'Upload berhasil',
          url: attachmentUrl
        })
      } else {
        res.status(400).json({
          message: 'file is required'
        })
      }
    }
  })
}
