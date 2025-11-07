const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

router.get(
  "/",
  protect,
  authorizeRoles("superadmin", "societyadmin"),
  controller.list
);
router.get(
  "/:id",
  protect,
  authorizeRoles("superadmin", "societyadmin"),
  controller.get
);
router.put(
  "/:id",
  protect,
  authorizeRoles("superadmin", "societyadmin"),
  controller.update
);
router.delete(
  "/:id",
  protect,
  authorizeRoles("superadmin", "societyadmin"),
  controller.delete
);
router.get(
  "/export/pdf",
  protect,
  authorizeRoles("superadmin", "societyadmin"),
  controller.exportUsersPdf
);

module.exports = router;
