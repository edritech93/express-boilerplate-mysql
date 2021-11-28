'use strict';
const bcrypt = require('bcrypt-nodejs');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasOne(models.Tokens, {
        foreignKey: 'userId',
        as: 'token',
      });
    }
  };
  Users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  Users.beforeSave((user) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });
  return Users;
};