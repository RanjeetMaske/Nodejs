const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      role: {
        type: DataTypes.ENUM(
          "superadmin",
          "societyadmin",
          "societyuser",
          "watchman"
        ),
        allowNull: false,
        defaultValue: "societyuser",
      },
      flatNumber: { type: DataTypes.STRING },
      phone: { type: DataTypes.STRING },
      societyId: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );
};
