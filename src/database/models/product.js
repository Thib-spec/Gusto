const { Model, DataTypes } = require("sequelize");

class Product extends Model {
    getFullName() {
        return [this.firstname, this.lastname].join(' ')
    }
}

Product.init({
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
    }
}, {
    sequelize,
    modelName: 'Product'
})

module.exports = Product