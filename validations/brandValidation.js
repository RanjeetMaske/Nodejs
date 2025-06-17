const Joi = require("joi");

const brandSchema = {
  createbrand: Joi.object().keys({
    brand_name: Joi.string().required(),
    brand_logo: Joi.string(),
  }),

  getByIdBrand : Joi.object().keys({
    id: Joi.number().required(),
  }),

  updateBrandById : Joi.object().keys({
    id: Joi.number().required(),
    brand_name: Joi.string().required(),
  }),
  
  deleteBrandById: Joi.object().keys({
    id: Joi.number().min(1).required() 
  })

};
module.exports = brandSchema;
