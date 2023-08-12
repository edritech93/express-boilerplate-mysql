import { DataTypes, Sequelize } from 'sequelize';
import { ROLE } from '../constants';

export const userModel = (sequelize: Sequelize) => {
  return sequelize.define('user', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    role: {
      type: DataTypes.ENUM(ROLE.SELLER, ROLE.USER),
      defaultValue: ROLE.SELLER
    },
    districtId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attachment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
};
