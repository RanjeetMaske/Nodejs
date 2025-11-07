const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Attendance', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    watchmanId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    societyId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    flatUserId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true }, // optional: resident involved
    entryTime: { type: DataTypes.DATE, allowNull: false },
    exitTime: { type: DataTypes.DATE, allowNull: true },
    notes: { type: DataTypes.TEXT }
  }, {
    tableName: 'attendance',
    timestamps: true
  });
};
