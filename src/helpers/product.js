const { Model, DataTypes,sequelize } = require("./connexion");
const Categories = require("./categories")
const Sales = require("./sales")


const Products = sequelize.define('Products',{
    Id_product: {
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
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Quantity_min: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Quantity_max: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Label: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Ubd: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    fk_Id_category:{
        type: DataTypes.INTEGER,
        allowNull = false,
        references:{
            model : 'Categories',
            key: 'Id_category'
        }
    }
}, {
    sequelize,
    modelName: 'Products'
})

Products.Categories = Products.belongsTo(Categories, {
    foreignKey: 'fk_Id_category'
})

Products.belongsToMany(Sales, {
    through: "products_sales",
    foreignKey: "Id_product",
});

Sales.belongsToMany(Products, {
    through: "products_sales",
    foreignKey: "Id_sale",
});

module.exports = Products