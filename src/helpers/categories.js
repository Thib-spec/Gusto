const { Model, DataTypes,sequelize } = require("./connexion");
const  Client  = require("./Users");


const Categories = sequelize.define('Categories',{
    Id_categories: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Label: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Image: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING(150),
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