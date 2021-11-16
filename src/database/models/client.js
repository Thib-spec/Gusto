const { Model, DataTypes} = require("sequelize");


module.exports = (sequelize) => {
    class Client extends Model{
    }

Client.init({
    Id_client: {
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
    modelName: 'Client',
    timestamps: true,
    createdAt: true,
    updatedAt: true
})

return Client
}

