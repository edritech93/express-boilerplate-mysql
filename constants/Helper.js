'use strict'
const bcrypt = require('bcryptjs')

const Helper = {
  hashPassword: (password) => {
    if (password) {
      return bcrypt.hashSync(password, 10)
    } else {
      return null
    }
  },
  comparePassword: (passwordA, passwordB) => {
    return bcrypt.compareSync(passwordA, passwordB)
  }
}

module.exports = Helper
