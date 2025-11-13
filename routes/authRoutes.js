const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

// Public login
router.post("/login", login);

// Register - protected: only superadmin or societyadmin can create users
router.post(
  "/register",
  protect,
  authorizeRoles("superadmin", "societyadmin"),
  register
);
// router.post("/register", register);
module.exports = router;
