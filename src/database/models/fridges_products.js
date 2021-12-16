const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class fridges_products extends Model{
    }


fridges_products.init({

id_fridges_products:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    allowNull:false,
    autoIncrement:true
},

quantity:{
    type: DataTypes.TINYINT,
    allowNull:false
},

}, {
    sequelize,
    modelName: 'fridges_products',
    timestamps: true,

})

return fridges_products

}