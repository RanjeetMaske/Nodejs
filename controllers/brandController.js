const Response = require("../classes/Response");
const db = require("../config/db.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwtTokenKey");
const { QueryTypes } = require('sequelize');

const createBrand = async (req, res) => {
    try {
        let brandExist = await db.brand.findOne({where: { brand_name: req.body.brand_name }});
        if (brandExist) {
        return res.status(400).send(Response.sendResponse(false, null, "Brand already exists", 400));
        }
        req.body.brand_logo = req.files.brand_logo.originalFilename
        let response = await db.brand.create(req.body);
        return res.status(201).send(Response.sendResponse(true, response, null, 201));
    } catch (err) {
        return res.status(500).send(Response.sendResponse(false,null,"Error occured",500));
    }
    }

const getallBrands = async (req,res)=>{
    try {
        let response = await db.brand.findAll();
        return res.status(200).send(Response.sendResponse(true, response, "Brand data", 200));
    } catch (err) {
        return res.status(500).send(Response.sendResponse(false,null,"Error occured",500));
    }
}

const getByIdBrand  = async (req,res)=>{
    try {
        let response = await db.brand.findOne({ where: { id: req.params.id } });
        return res.status(200).send(Response.sendResponse(true, response, "Brand data", 200));
    } catch (err) {
        return res.status(500).send(Response.sendResponse(false,null,"Error occured",500));
    }
}

const deleteBrandById = async (req, res) => {
    try {
        const brand = await db.brand.findOne({ where: { id: req.params.id } });

        if (!brand) {
            return res.status(404).send(Response.sendResponse(false, null, "Brand not found", 404));
        }

        let response = await db.brand.destroy({ where: { id: req.params.id } });

        if (response > 0) {
            return res.status(200).send(Response.sendResponse(true, response, "Brand data deleted successfully", 200));
        } else {
            return res.status(500).send(Response.sendResponse(false, null, "Failed to delete brand", 500));
        }
    } catch (err) {
        return res.status(500).send(Response.sendResponse(false, null, "Error occurred", 500));
    }
};


const updateBrandById = async (req,res)=>{
    try {
        let response = await db.brand.update(req.body,{ where: { id: req.body.id } });
        return res.status(200).send(Response.sendResponse(true, response, "Brand data", 200));
    } catch (err) {
        return res.status(500).send(Response.sendResponse(false,null,"Error occured",500));
    }
}

module.exports = {
    createBrand,
    getallBrands,
    getByIdBrand,
    updateBrandById,
    deleteBrandById,
};