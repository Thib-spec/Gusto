const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Fridges extends Model{
        static associate(models){

            Fridges.belongsTo(models.Technologies, {
                foreignKey: 'fk_id_technologies'
            });

            Fridges.belongsTo(models.FridgePresets,{
                foreignKey: "fk_id_fridgePreset"
            })

            Fridges.belongsToMany(models.Client,{   
                through:"clients_fridges",
                foreignKey:"fk_id_fridge"
            })

            Fridges.belongsToMany(models.Badges,{
                as:"badges",       
                through:"fridges_badges",
                foreignKey:"fk_id_fridge"
            })

            Fridges.belongsToMany(models.State,{
                as:"states",
                through:"fridges_states",
                foreignKey:"fk_id_fridge"
            })

            Fridges.belongsToMany(models.Products,{
                through:'fridges_products',
                foreignKey:"fk_id_fridge",
            })

            Fridges.belongsToMany(models.Nationalities,{
                as: 'nationalities',
                through:'fridges_nationalities',
                foreignKey:"fk_id_fridge",
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