const { Model, DataTypes } = require("sequelize");

class Tech extends Model {

}

Tech.init({
    Id_tech: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Label: {
        type: DataTypes.CHAR,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Tech'
})

module.exports = Tech