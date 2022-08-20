const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Resultant', {
    money: {
      type: DataTypes.FLOAT(),
      primaryKey: true,
      allowNull: true
    }
  }, {
    timestamps: false
  })
}
