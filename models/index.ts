import { Sequelize } from 'sequelize';
import { authModel } from './authModel';
import { userModel } from './userModel';
import { productModel } from './productModel';
import { dbConfig } from '../config/db.config';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db: any = {};
db.sequelize = sequelize;

db.auth = authModel(sequelize);
db.user = userModel(sequelize);
db.product = productModel(sequelize);

db.user.hasMany(db.product, { foreignKey: 'userId' });

db.product.belongsTo(db.user, {
  foreignKey: 'userId',
  as: 'seller'
});

export default db;
