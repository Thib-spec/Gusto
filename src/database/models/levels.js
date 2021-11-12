const { Model, DataTypes } = require("sequelize");

class Levels extends Model {

}

Levels.init({
    Id_level: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Levels'
})

module.exports = Levels