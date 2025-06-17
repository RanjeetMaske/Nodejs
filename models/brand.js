const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");

//models/brand.js
module.exports = (sequelize , DataTypes) => {
    const Brand = sequelize.define('brand', {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      brand_name:{
          type: DataTypes.STRING
      },
      brand_logo:{
        type: DataTypes.STRING
      },
    },{
      timestamps: true,
      underscored: true
    });
    return Brand;

}