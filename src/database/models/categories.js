const { Model, DataTypes } = require("sequelize");

class Categories extends Model {
    getFullName() {
        return [this.firstname, this.lastname].join(' ')
    }
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

module.exports = Categories