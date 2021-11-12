const { Model, DataTypes } = require("sequelize");

class Client extends Model {
    getFullName() {
        return [this.firstname, this.lastname].join(' ')
    }
}

Client.init({
    Id_client: {
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
    modelName: 'Client'
})

module.exports = Client