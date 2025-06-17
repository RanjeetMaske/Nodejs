const Response = require("../classes/Response");
const db = require("../config/db.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwtTokenKey");

const registerUser = async (req, res) => {
  try {
    let user_data = req.body;
    let userExist = await db.users.findOne({
      where: { email_id: user_data.email_id },
    });
    if (userExist) {
      return res
        .status(400)
        .send(Response.sendResponse(false, null, "User already exists", 400));
    }

    user_data.password = await bcrypt.hash(user_data.password, 10);
    let response = await db.users.create(user_data);
    return res
      .status(201)
      .send(Response.sendResponse(true, response, null, 201));
  } catch (err) {
    return res
      .status(500)
      .send(
        Response.sendResponse(
          false,
          null,
          ROLE_CONSTANTS_STATUS.ERROR_OCCURED,
          500
        )
      );
  }
};

const signin = async (req, res) => {
  try {
    let { email_id, password } = req.body;
    let user = await db.users.findOne({ where: { email_id: email_id } });
    if (!user) {
      return res
        .status(400)
        .send(Response.sendResponse(false, null, "User not found", 400));
    }

    let isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .send(
          Response.sendResponse(false, null, "Password does not match", 400)
        );
    }

    delete user.dataValues.password;

    const token = jwt.sign(
      {
        email_id: user.dataValues.email_id,
        phone: user.dataValues.phone,
        type:user.dataValues.type
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );
    console.log("token???????????????????????",token);
    

    const response = user.dataValues;
    console.log("response????????????????????????????",response);
    
    response.token = token;

    return res.status(200).send(Response.sendResponse(true, user, null, 200));
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(
        Response.sendResponse(
          false,
          null,
          ROLE_CONSTANTS_STATUS.ERROR_OCCURED,
          500
        )
      );
  }
};

const forgetPassword = async (req, res) => {
  try {
    let { email_id } = req.body;
    let user = await db.users.findOne({ where: { email_id: email_id } });
    if (!user) {
      return res
        .status(400)
        .send(Response.sendResponse(false, null, "User not found", 400));
    }

    // send email
    return res
      .status(200)
      .send(Response.sendResponse(true, null, "Email sent", 200));
  } catch (err) {
    return res
      .status(500)
      .send(
        Response.sendResponse(
          false,
          null,
          ROLE_CONSTANTS_STATUS.ERROR_OCCURED,
          500
        )
      );
  }
};

const setPassword = async (req, res) => {
  try {
    let { token, password } = req.body;
    const decoded = jwt.verify(token, JWT_SECRET);

    let user_data = await db.sequelize.query(
      `Select id,email_id,password FROM users Where email_id = '${decoded.email_id}' LIMIT 1`,
      { type: QueryTypes.SELECT }
    );

    if (!user_data[0]) {
      return res
        .status(400)
        .send(
          Response.sendResponse(
            false,
            null,
            APPROVAL_DATA.EMAIL_AND_PASSWORD_INVALID,
            400
          )
        );
    } else {
      password = await bcrypt.hash(password, 10);

      let user_update = await db.sequelize.query(
        `Update users Set password = '${password}' Where email_id = '${decoded.email_id}'`,
        { type: QueryTypes.UPDATE }
      );
      // await userActivityLogger.logTagtalkActivity(req , req.user.id, "Set Password");
      return res
        .status(200)
        .send(
          Response.sendResponse(
            true,
            user_update,
            APPROVAL_DATA.PASSWORD_UPDATE,
            200
          )
        );
    }
  } catch (error) {
    return res.status(500).send(Response.sendResponse(false, null, error, 500));
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await db.users.findAll({
      attributes: { exclude: ["password"] },
    });

    if (!users || users.length === 0) {
      return res
        .status(404)
        .send(Response.sendResponse(false, null, "No users found", 404));
    }

    return res
      .status(200)
      .send(Response.sendResponse(true, users, null, 200));
  } catch (err) {
    return res
      .status(500)
      .send(Response.sendResponse(false, null, err.message, 500));
  }
};
const updateUser = async(req,res)=>{

}

const updateIsActiveStatus = async (req, res) => {
  try {

    const { id, is_active } = req.body;
    const user = await db.users.findOne({ where: { id: id } });
    if (!user) {
      return res
        .status(404)
        .send(Response.sendResponse(false, null, "User not found", 404));
    }

    let update_user = await db.users.update({ is_active }, { where: { id } });
    return res
      .status(200)
      .send(Response.sendResponse(true, null, "User status updated successfully", 200));
  } catch (err) {
    return res
      .status(500)
      .send(Response.sendResponse(false, null, err.message, 500));
  }
};

module.exports = {
  registerUser,
  signin,
  forgetPassword,
  setPassword,
  getAllUsers,
  updateUser,
  updateIsActiveStatus
};
