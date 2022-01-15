module.exports = (sequelize, Sequelize) => {
  const Model = sequelize.define('category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    categoryName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
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
  return Model
}
