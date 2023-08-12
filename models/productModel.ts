import { DataTypes, Sequelize } from 'sequelize';

export const productModel = (sequelize: Sequelize) => {
  return sequelize.define('product', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productDetail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attachment: {
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
