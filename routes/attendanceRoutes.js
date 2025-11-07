const express = require("express");
const router = express.Router();
const controller = require("../controllers/attendanceController");
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

// attendance
router.post(
  "/entry",
  protect,
  authorizeRoles("watchman"),
  controller.recordEntry
);
router.post(
  "/exit",
  protect,
  authorizeRoles("watchman"),
  controller.recordExit
);
router.get(
  "/",
  protect,
  authorizeRoles("superadmin", "societyadmin", "watchman"),
  controller.getLogs
);

// visitor logs
router.post(
  "/visitor/entry",
  protect,
  authorizeRoles("watchman"),
  controller.recordVisitorEntry
);
router.post(
  "/visitor/exit",
  protect,
  authorizeRoles("watchman"),
  controller.recordVisitorExit
);
router.get(
  "/visitor",
  protect,
  authorizeRoles("superadmin", "societyadmin", "watchman"),
  controller.getVisitorLogs
);

module.exports = router;
