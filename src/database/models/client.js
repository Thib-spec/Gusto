const { Model, DataTypes } = require("sequelize");

class Client extends Model {

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

Client.belongsToMany(Fridges, {             //association many-to-many (en cas de création de table de liaison)
    through: "clients_fridges",
    foreignKey: "Id_fridge",
  });

Fridges.belongsToMany(Client, {
  through: "clients_fridges",
  foreignKey: "Id_client",
});

module.exports = Client