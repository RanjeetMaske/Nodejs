const express = require("express");
const router = express.Router();
const controller = require("../controllers/maintenanceController");
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

// create maintenance (admin)
router.post(
  "/",
  protect,
  authorizeRoles("superadmin", "societyadmin"),
  controller.create
);

// list (admins see society; users see their own)
router.get(
  "/",
  protect,
  authorizeRoles("superadmin", "societyadmin", "societyuser"),
  controller.list
);

// pay maintenance (any authorized)
router.post(
  "/:id/pay",
  protect,
  authorizeRoles("superadmin", "societyadmin", "societyuser"),
  controller.pay
);

// export receipt as PDF
router.get(
  "/:id/receipt",
  protect,
  authorizeRoles("superadmin", "societyadmin", "societyuser"),
  controller.exportReceipt
);

module.exports = router;
