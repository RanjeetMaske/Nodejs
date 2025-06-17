// routes/index.js
const express = require("express");
const router = express.Router();

// Import route handlers
const roleRoutes = require("./role");
const useroutes = require("./user");
const brandroutes = require("./brand");

// Register route handlers
router.use("/role", roleRoutes);
router.use("/user", useroutes);
router.use("/brand", brandroutes);

module.exports = router;
