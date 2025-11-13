const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "VisitorLog",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      watchmanId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      societyId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      visitorName: { type: DataTypes.STRING, allowNull: false },
      vehicleNumber: { type: DataTypes.STRING },
      purpose: { type: DataTypes.STRING },
      entryTime: { type: DataTypes.DATE, allowNull: false },
      exitTime: { type: DataTypes.DATE, allowNull: true },
    },
    {
      tableName: "visitor_logs",
      timestamps: true,
    }
  );
};
