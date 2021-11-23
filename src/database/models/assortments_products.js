const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class assortment_products extends Model{
    }


    assortment_products.init({

    id_assortment: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    
    quantity_min: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    quantity_max:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
    
}, {
    sequelize,
    modelName: 'assortment_products',
    timestamps: true,
    createdAt: true,
    updatedAt: true

})

return assortment_products

}