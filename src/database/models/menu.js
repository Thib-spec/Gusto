const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Menus extends Model{
        static associate(models){

            Menu.belongsTo(models.Client, {
                foreignKey: 'fk_Id_client'
            })
            
            Menu.belongsToMany(models.Products, {
                through: "menus_products",
                foreignKey: "Id_product",
            });
            
        }
    }


Menus.init({
    Id_menu: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Image: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    Price: {
        type: DataTypes.DECIMAL(5,2),
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
}, {
    sequelize,
    modelName: 'Menu',
    timestamps: true,
    createdAt: true,
    updatedAt: true

})

return Menus

}