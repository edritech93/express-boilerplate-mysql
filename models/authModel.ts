import { DataTypes, Sequelize } from 'sequelize';

export const authModel = (sequelize: Sequelize) => {
  return sequelize.define('auth', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'profiles',
        key: 'id',
      },
    },
  });
};
