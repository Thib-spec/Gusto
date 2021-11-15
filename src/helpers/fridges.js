const { Model, DataTypes,sequelize } = require("./connexion");
const Tech = require("./tech")



const Fridges = sequelize.define('Fridges',{
    Id_fridge: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Status:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    Label: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fk_Id_tech: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model : 'Fridges',
            key: 'Id_fridge'
        }
    }
}, {
    sequelize,
    modelName: 'Fridges'
})

Fridges.Tech = Fridges.belongsTo(Tech, {
    foreignKey: 'fk_Id_tech'
});


module.exports = Fridges