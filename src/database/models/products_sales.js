const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class products_sales extends Model{
    }


    products_sales.init({

id_products_sales:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    allowNull:false,
    autoIncrement:true
},

    quantity_product: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'products_sales',
    timestamps: true,

})

return products_sales

}