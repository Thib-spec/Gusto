const { Model, DataTypes } = require("sequelize");

class Tags extends Model {

}

Tags.init({
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

Tags.Products = Tags.belongsTo(this.Products, {
    foreignKey: 'fk_Id_product'
})

module.exports = Tags