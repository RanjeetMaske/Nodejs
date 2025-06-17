const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/jwtTokenKey");
const Response = require("../../classes/Response");
const { Op, QueryTypes } = require("sequelize");
const db = require("../../config/db.config");
const { Query } = require("firebase-admin/firestore");

const verifyToken = async (req, res, next) => {
  if (req.headers['authorization'] == undefined) {
    return res.status(401).send(Response.sendResponse(false, null, 'A token is required for authentication', 401));
  }
  const token = req.headers['authorization'].split(' ')[1];

  if (!token) 
    return res.status(401).send(Response.sendResponse(false, null, 'A token is required for authentication',401));
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    let user_data = await db.sequelize.query(`SELECT * FROM users AS us WHERE us.email_id = :email`,
      {replacements:{email : decoded.email_id}, type : QueryTypes.SELECT}
    ) 
    req.user = user_data;

  } catch (err) {
    return res.status(401).send(Response.sendResponse(false, null, 'Invalid Token',401));
  }

  return next();
};

module.exports = verifyToken;
