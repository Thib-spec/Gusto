const { Model, DataTypes,sequelize } = require("./connexion");


const Tech = sequelize.define('Tech',{
    Id_tech: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Label: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Tech'
})

module.exports = Tech