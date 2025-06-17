const { toDefaultValue } = require("sequelize/lib/utils");

//models/role.js
module.exports = (sequelize , DataTypes) => {
    const User = sequelize.define('user', {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name:{
          type: DataTypes.STRING
      },
      type:{
        type: DataTypes.STRING
      },
      email_id:{
        type: DataTypes.STRING
      },
      phone:{
        type: DataTypes.STRING
      },
      password:{
        type: DataTypes.STRING
      },
      is_active:{
        type:DataTypes.STRING,
        defaultValue : 0
      }
    },{
      timestamps: true,
      underscored: true
    });
    return User;
}
