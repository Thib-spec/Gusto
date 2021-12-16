const { Model, DataTypes} = require("sequelize");


module.exports = (sequelize) => {
    class Client extends Model{
        static associate(models){

            Client.hasMany(models.Users,{
                foreignKey: "fk_id_client",
                sourceKey: "id_client"
            })

            Client.belongsToMany(models.Fridges,{    
                through:"clients_fridges",
                foreignKey:{name:"fk_id_client", allowNull:false}
            })
        }
    }

Client.init({
    id_client: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    label: {
        type: DataTypes.STRING(20),
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

