const { Sequelize } = require("sequelize");
require("dotenv").config();

// ✅ Create a new Sequelize instance for MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME, // database name
  process.env.DB_USER, // username
  process.env.DB_PASS, // password
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: 3306,
    logging: false, // disable SQL logs (optional)
    dialectOptions: {
      connectTimeout: 20000, // 20 seconds connection timeout
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// ✅ Test database connection
sequelize
  .authenticate()
  .then(() => console.log("✅ MySQL connected successfully."))
  .catch((err) => console.error("❌ Unable to connect to MySQL:", err.message));

// ✅ Export Sequelize instance
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ⚙️ Import models here (you’ll add them later)
db.Role = require("../models/Maintenance")(sequelize, Sequelize);
db.User = require("../models/User")(sequelize, Sequelize);
db.Society = require("../models/Society")(sequelize, Sequelize);
db.Attendance = require("../models/Attendance")(sequelize, Sequelize);
db.VisitorLog = require("../models/VisitorLog")(sequelize, Sequelize);

module.exports = db;
