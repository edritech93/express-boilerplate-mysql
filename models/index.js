const dbConfig = require('../config/db.config.js')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.auth = require('./auth.model.js')(sequelize, Sequelize)
db.profile = require('./profile.model.js')(sequelize, Sequelize)
db.district = require('./district.model.js')(sequelize, Sequelize)
db.product = require('./product.model.js')(sequelize, Sequelize)
db.category = require('./category.model.js')(sequelize, Sequelize)

db.profile.hasMany(db.product, { foreignKey: 'userId' })
db.category.hasMany(db.product, { foreignKey: 'categoryId' })

db.product.belongsTo(db.profile, {
  foreignKey: 'userId',
  as: 'seller'
})
db.product.belongsTo(db.category, {
  foreignKey: 'categoryId',
  as: 'category'
})

module.exports = db
