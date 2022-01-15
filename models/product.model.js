module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('product', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    productName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    productDetail: {
      type: Sequelize.STRING,
      allowNull: false
    },
    productPrice: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    attachment: {
      type: Sequelize.STRING,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'profiles',
        key: 'id'
      }
    }
  })
  return Product
}
