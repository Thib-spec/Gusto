const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class FridgePresets extends Model{

        static associate(models){
            
            FridgePresets.belongsToMany(models.Menus, {
                as:"menus",
                through: "fridgePresets_menus",
                foreignKey: "fk_id_fridgePreset",
            });

            FridgePresets.belongsToMany(models.Products,{
                through:"fridgePresets_products",
                foreignKey:"fk_id_fridgePreset"
            })

            FridgePresets.belongsTo(models.Client,{
                foreignKey:"fk_id_client"
            })
        }
    }


    FridgePresets.init({
    id_fridgePresets: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    
    label: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
}, {
    sequelize,
    modelName: 'FridgePresets',
    timestamps: true,
    createdAt: true,
    updatedAt: true

})

return FridgePresets

}