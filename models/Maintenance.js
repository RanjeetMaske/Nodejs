const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Maintenance",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      societyId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }, // resident who owes/paid
      amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      dueDate: { type: DataTypes.DATE, allowNull: false },
      status: {
        type: DataTypes.ENUM("pending", "paid", "overdue"),
        defaultValue: "pending",
      },
      paidAt: { type: DataTypes.DATE, allowNull: true },
    },
    {
      tableName: "maintenance",
      timestamps: true,
    }
  );
};
