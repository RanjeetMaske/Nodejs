const express = require("express");
const router = express.Router();

const brandController = require("../controllers/brandController");
const JoiMiddleWare = require('../middlewares/joi/joiMiddleware'); 
const brandSchema = require("../validations/brandValidation");
const userAuth = require("../middlewares/jsonwebtoken/joiAuthMiddleware");

router.post("/create",
    JoiMiddleWare(brandSchema.createbrand, 'body'),
    brandController.createBrand);

router.get("/get-all-brands",
        brandController.getallBrands);    

router.get("/:id",
    JoiMiddleWare(brandSchema.getByIdBrand, 'params'),
    brandController.getByIdBrand);         

router.put("/update",
    JoiMiddleWare(brandSchema.updateBrandById, 'body'),
    brandController.updateBrandById);

router.delete("/:id",
        JoiMiddleWare(brandSchema.deleteBrandById, 'params'),
        brandController.deleteBrandById);
    
module.exports = router;