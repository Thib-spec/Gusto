const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Menus extends Model{

        static associate(models){

            Menus.belongsTo(models.Client, {
                foreignKey: 'fk_id_client'
            })
            
            Menus.belongsToMany(models.Products, {
                through: "menus_products",
                foreignKey: "fk_id_product",
            });
            
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
        type: DataTypes.STRING,
        allowNull: false
    },
    fridge_label: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false
    },
    
}, {
    sequelize,
    modelName: 'Menu',
    timestamps: true,
    createdAt: true,
    updatedAt: true

})

return Menus

}