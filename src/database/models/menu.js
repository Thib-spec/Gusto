const { Model, DataTypes } = require("sequelize");

class Menu extends Model {
    getFullName() {
        return [this.firstname, this.lastname].join(' ')
    }
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
    }
}, {
    sequelize,
    modelName: 'Menu'
})

module.exports = Menu