const { Model, DataTypes} = require("sequelize");
const Fridges = require("../../helpers/fridges")

module.exports = (sequelize) => {
    class Client extends Model{}

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
    modelName: 'Client'
})

return Client
}

