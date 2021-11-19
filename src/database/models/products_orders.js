const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class products_orders extends Model{
    }


products_orders.init({

id_products_orders:{
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
    modelName: 'products_orders',
    timestamps: true,

})

return products_orders

}