'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tokens.belongsTo(models.Clients, {
        foreignKey: 'clientId',
        as: 'client',
      });
      Tokens.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  };
  Tokens.init({
    accessToken: DataTypes.STRING,
    accessTokenExpiresAt: DataTypes.DATE,
    refreshToken: DataTypes.STRING,
    refreshTokenExpiresAt: DataTypes.DATE,
    clientId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tokens',
  });
  return Tokens;
};