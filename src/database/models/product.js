const { genSalt } = require("bcrypt");
const { Model, DataTypes } = require("sequelize");

class Products extends Model {

}

Products.init({
    Id_product: {
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
        type: DataTypes.CHAR,
        allowNull: false
    },
    Ubd: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    Description: {
        type: DataTypes.CHAR(150),
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