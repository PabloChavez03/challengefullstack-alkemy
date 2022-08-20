const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Type', {
    name: {
      type: DataTypes.STRING(),
      primaryKey: true,
      allowNull: true,
      unique: true
    }
  }, {
    timestamps: false
  })
}
