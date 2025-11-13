// const formData = require("express-form-data");
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const routes = require("./routes");
// const app = express();

// app.use(cors());

// app.use(formData.parse());
// app.use(bodyParser.json());

// const sequelizeDB = require("./config/db.config");
// sequelizeDB.sequelize.sync(sequelizeDB);

// // Use routes
// app.use("/v1", routes);
// app.use("/auth", require("./routes/authRoutes"));
// app.use("/superadmin", require("./routes/superAdminRoutes"));
// app.use("/societyadmin", require("./routes/societyAdminRoutes"));
// app.use("/userroutes", require("./routes/userRoutes"));
// app.use("/watchman", require("./routes/watchmanRoutes"));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// ✅ Import DB config (Sequelize instance)
const db = require("./config/db.config");

// ✅ Import Routes
const authRoutes = require("./routes/authRoutes");
const societyRoutes = require("./routes/societyRoutes");
const userRoutes = require("./routes/userRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");

// ✅ Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/societies", societyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/maintenance", maintenanceRoutes);

// ✅ Base route
app.get("/", (req, res) => res.send("Society Management API (MySQL)"));

// ✅ Start server after syncing DB
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    // ⚙️ Ensure DB sync — alter:true updates schema automatically in dev
    await db.sequelize.sync({ alter: true });
    console.log("✅ Database synced successfully.");

    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("❌ Failed to start the server:", error.message);
  }
})();
