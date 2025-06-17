const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const JoiMiddleWare = require("../middlewares/joi/joiMiddleware");
const userSchema = require("../validations/userValidation");
const userAuth = require("../middlewares/jsonwebtoken/joiAuthMiddleware");
const { joinSQLFragments } = require("sequelize/lib/utils/join-sql-fragments");
const brandSchema = require("../validations/brandValidation");

router.post(
  "/",
  JoiMiddleWare(userSchema.registerUser, "body"),
  userController.registerUser
);

router.post(
  "/signin",
  JoiMiddleWare(userSchema.signinUser, "body"),
  userController.signin
);

router.post(
  "/forgetpassword",
  JoiMiddleWare(userSchema.forgetPasswordUser, "body"),
  userController.forgetPassword
);

router.put(
  "/setPassword",
  JoiMiddleWare(userSchema.setUserPassword, "body"),
  userController.setPassword
);

router.get("/get-all-user", userAuth, userController.getAllUsers);

router.put(
  "/updateUser",
  userAuth,
  JoiMiddleWare(userSchema.updateUser, "body"),
  userController.updateIsActiveStatus
);

module.exports = router;
