module.exports = (sequelize, Sequelize) => {
  const Model = sequelize.define('district', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    districtName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    cityId: {
      type: Sequelize.INTEGER
    }
  })
  return Model
}
