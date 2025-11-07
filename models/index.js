const { Sequelize } = require("sequelize");
const UserModel = require("./User");
const SocietyModel = require("./Society");
const AttendanceModel = require("./Attendance");
const VisitorLogModel = require("./VisitorLog");
const MaintenanceModel = require("./Maintenance");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
  }
);

// init models
const User = UserModel(sequelize);
const Society = SocietyModel(sequelize);
const Attendance = AttendanceModel(sequelize);
const VisitorLog = VisitorLogModel(sequelize);
const Maintenance = MaintenanceModel(sequelize);

// associations
Society.hasMany(User, { foreignKey: "societyId", onDelete: "SET NULL" });
User.belongsTo(Society, { foreignKey: "societyId" });

User.hasMany(Attendance, { foreignKey: "watchmanId" }); // watchman -> attendance
Attendance.belongsTo(User, { foreignKey: "watchmanId", as: "watchman" });

User.hasMany(VisitorLog, { foreignKey: "watchmanId" });
VisitorLog.belongsTo(User, { foreignKey: "watchmanId", as: "watchman" });

Society.hasMany(Attendance, { foreignKey: "societyId" });
Attendance.belongsTo(Society, { foreignKey: "societyId" });

User.hasMany(Maintenance, { foreignKey: "userId" });
Maintenance.belongsTo(User, { foreignKey: "userId" });

Society.hasMany(Maintenance, { foreignKey: "societyId" });
Maintenance.belongsTo(Society, { foreignKey: "societyId" });

module.exports = {
  sequelize,
  Sequelize,
  User,
  Society,
  Attendance,
  VisitorLog,
  Maintenance,
};
