const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class fridgePresets_products extends Model{
    }


    fridgePresets_products.init({

    id_fridgePresets_products: {
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
    modelName: 'fridgePresets_products',
    timestamps: true,
    createdAt: true,
    updatedAt: true

})

return fridgePresets_products

}