const { Model, DataTypes,sequelize } = require("./connexion");

const Products = require("./product")


const Tags = sequelize.define('Tags',{
    Id_tags: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    fk_Id_product:{
        type: DataTypes.INTEGER,
        allowNull = false,
        references:{
            model : 'Products',
            key: 'Id_product'
        }
    }
}, {
    sequelize,
    modelName: 'Tags'
})

Tags.Products = Tags.belongsTo(Products, {
    foreignKey: 'fk_Id_product'
})

module.exports = Tags