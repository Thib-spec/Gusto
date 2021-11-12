const { Model, DataTypes } = require("sequelize");
const { Client } = require("./Users");

class Categories extends Model {

}

Categories.init({
    Id_categories: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Label: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    Image: {
        type: DataTypes.CHAR(150),
        allowNull: false
    },
    Description: {
        type: DataTypes.CHAR(150),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Categories'
})

Categories.belongsToMany(Client, {
    through: "clients_categories",
    foreignKey: "Id_category",
  });

Client.belongsToMany(Categories, {
  through: "clients_categories",
  foreignKey: "Id_client",
});

module.exports = Categories