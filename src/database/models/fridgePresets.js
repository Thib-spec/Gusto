const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class FridgePresets extends Model{

        static associate(models){

            // Dans ce cas précis, on ajoute le mot clef "as" ce qui permet à sequelize de crééer des fonctions automatiquement pour interagir avec notre model dans les controllers
            // Avec ce mot clef sequelize créé les fonction getMenus()/ addMenu() / removeMenu() suivant la valeur indiqué pour "as"
        
            
            FridgePresets.belongsToMany(models.Menus, {
                as:"menus",
                through: "fridgePresets_menus",
                foreignKey: {name:"fk_id_fridgePreset",allowNull:false}
            });

            FridgePresets.belongsToMany(models.Products,{
                through:"fridgePresets_products",
                foreignKey:{name:"fk_id_fridgePreset", allowNull:false}
            })

            FridgePresets.belongsTo(models.Client,{
                foreignKey:{name:"fk_id_client", allowNull:false}
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
        type: DataTypes.STRING(20),
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