const { Model, DataTypes } = require("sequelize");

class Menu extends Model {

}

Menu.init({
    Id_menu: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Image: {
        type: DataTypes.CHAR(150),
        allowNull: false
    },
    Price: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false
    },
    web_label: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    fridge_label: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    fk_Id_client:{
        type: DataTypes.INTEGER,
        allowNull = false,
        references:{
            model : 'Client',
            key: 'Id_client'
        }
    }
}, {
    sequelize,
    modelName: 'Menu'
})

Menu.Client = Menu.belongsTo(Client, {
    foreignKey: 'fk_Id_client'
})

Menu.belongsToMany(Products, {
    through: "menus_products",
    foreignKey: "Id_product",
  });

Products.belongsToMany(Menu, {
    through: "menus_products",
    foreignKey: "Id_menu",
});

module.exports = Menu