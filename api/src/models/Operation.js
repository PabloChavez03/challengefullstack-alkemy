const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Operation', {
    concept: {
      type: DataTypes.TEXT(DataTypes.STRING()),
      allowNull: true
    },
    amount: {
      type: DataTypes.FLOAT(),
      allowNull: true
    },
    date: {
      type: DataTypes.DATE(),
      defaultValue: DataTypes.DATE(),
      allowNull: true
    }
  },
  {
    timestamps: false
  })
}
