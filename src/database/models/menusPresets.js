const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class MenusPresets extends Model{

        static associate(models){
            
            MenusPresets.belongsToMany(models.Menus, {
                through: "menusPresets_menus",
                foreignKey: "fk_id_menu",
            });

            MenusPresets.belongsToMany(models.Products,{
                through:"menusPresets_products",
                foreignKey:"fk_id_product"
            })

            MenusPresets.hasOne(models.Fridges,{
                foreignKey:"fk_id_menu_preset"
            })
            
        }
    }


    MenusPresets.init({
    id_menu_preset: {
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
    modelName: 'MenusPresets',
    timestamps: true,
    createdAt: true,
    updatedAt: true

})

return MenusPresets

}