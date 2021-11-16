const { Model, DataTypes} = require("sequelize");


module.exports = (sequelize) => {
    class Client extends Model{
        static associate(models){
        
            Client.belongsToMany(models.Categories,{
                through: 'clients_categories',
                foreignKey: 'fk_Id_category'               
            })

            Client.belongsToMany(models.Fridges,{      
                through:"clients_fridges",
                foreignKey:"fk_Id_fridge"
            })
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

