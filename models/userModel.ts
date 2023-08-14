import { DataTypes, Sequelize } from 'sequelize';
import { ROLE } from '../constants';

export const userModel = (sequelize: Sequelize) => {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    role: {
      type: DataTypes.ENUM(ROLE.SELLER, ROLE.USER),
      defaultValue: ROLE.SELLER
    },
    attachment: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
};
