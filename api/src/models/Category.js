const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Category', {
    name: {
      type: DataTypes.STRING(),
      primaryKey: true,
      allowNull: true
    }
  }, {
    timestamps: false
  })
}
