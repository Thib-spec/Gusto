const { Model, DataTypes,sequelize } = require("./connexion");


const Levels = sequelize.define('Levels',{
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