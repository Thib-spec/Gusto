const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Fridges extends Model{
        static associate(models){

            Fridges.belongsTo(models.Technologies, {
                foreignKey: 'fk_id_technology'
            });

            Fridges.belongsToMany(models.Client,{      
                through:"clients_fridges",
                foreignKey:"fk_id_client"
            })

            Fridges.belongsToMany(models.Badges,{       
                through:"fridges_badges",
                foreignKey:"fk_id_badge"
            })

            Fridges.belongsToMany(models.State,{
                through:"fridges_state",
                foreignKey:"fk_id_state"
            })
        }
    }


    Fridges.init({
    id_fridge: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }, 
    label: {
        type: DataTypes.STRING,
        allowNull: false
    },
   
}, {
    sequelize,
    modelName: 'Fridges',
    timestamps: true,
    createdAt: true,
    updatedAt: true
})

return Fridges

}