const { ROLE } = require('../constants')

module.exports = (sequelize, Sequelize) => {
  const Profile = sequelize.define('profile', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    fullName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    role: {
      type: Sequelize.ENUM(ROLE.SELLER, ROLE.USER),
      defaultValue: ROLE.SELLER
    },
    districtId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    attachment: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  })
  return Profile
}
