const express = require("express");
const router = express.Router();
const controller = require("../controllers/societyController");
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

router.post("/", protect, authorizeRoles("superadmin"), controller.create);
router.get(
  "/",
  protect,
  authorizeRoles("superadmin", "societyadmin"),
  controller.getAll
);
router.get(
  "/:id",
  protect,
  authorizeRoles("superadmin", "societyadmin"),
  controller.getOne
);
router.put("/:id", protect, authorizeRoles("superadmin"), controller.update);
router.delete("/:id", protect, authorizeRoles("superadmin"), controller.delete);

module.exports = router;
