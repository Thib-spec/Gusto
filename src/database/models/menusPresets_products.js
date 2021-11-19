const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class menusPresets_products extends Model{
    }


    menusPresets_products.init({

    id_menusPresets_products: {
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
    modelName: 'menusPresets_products',
    timestamps: true,
    createdAt: true,
    updatedAt: true

})

return menusPresets_products

}