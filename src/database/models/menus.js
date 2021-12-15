const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Menus extends Model{

        static associate(models){

            Menus.belongsTo(models.Client, {
                foreignKey: {name:'fk_id_client', allowNull:false}
            })
            
            Menus.belongsToMany(models.Products, {
                as:"products",
                through: "menus_products",
                foreignKey: {name:"fk_id_menu", allowNull:false}
            });

            Menus.belongsToMany(models.FridgePresets,{
                through: "fridgePresets_menus",
                foreignKey: {name:"fk_id_menu", allowNull:false}
            })
            
        }
    }


Menus.init({
    id_menu: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    
    web_label: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    fridge_label: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    image: {
        type: DataTypes.STRING(50),
    },
    price: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    
}, {
    sequelize,
    modelName: 'Menus',
    timestamps: true,
    createdAt: true,
    updatedAt: true

})

return Menus

}