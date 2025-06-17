const Joi = require("joi");

const userSchema = {
  registerUser: Joi.object().keys({
    name: Joi.string().required(),
    email_id: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    type:Joi.string().required(),
  }),

  signinUser: Joi.object().keys({
    email_id: Joi.string().required(),
    password: Joi.string().required(),
  }),

  setUserPassword: Joi.object().keys({
    token: Joi.string().required(),
    password: Joi.string().required(),
  }),

  forgetPasswordUser: Joi.object().keys({
    email_id: Joi.string().required(),
  }),

  updateUser: Joi.object().keys({
    id: Joi.number().required(),
    is_active: Joi.any().required(),
  }),
  
};
module.exports = userSchema;
