const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Fridges extends Model{
        static associate(models){

            Fridges.belongsTo(models.Technologies, {
                foreignKey: {name:'fk_id_technologies', allowNull:false}
            });

            Fridges.belongsTo(models.FridgePresets,{
                foreignKey: "fk_id_fridgePreset"
            })

            Fridges.belongsToMany(models.Client,{   
                through:"clients_fridges",
                foreignKey:{name: "fk_id_fridge", allowNull:false}
            })

            Fridges.belongsToMany(models.Badges,{
                as:"badges",       
                through:"fridges_badges",
                foreignKey:{name:"fk_id_fridge", allowNull:false}
            })

            Fridges.belongsToMany(models.State,{
                as:"states",
                through:"fridges_states",
                foreignKey:{name:"fk_id_fridge", allowNull:false}
            })

            Fridges.belongsToMany(models.Products,{
                through:'fridges_products',
                foreignKey:{name:"fk_id_fridge", allowNull:false}
            })

            Fridges.belongsToMany(models.Nationalities,{
                as: 'nationalities',
                through:'fridges_nationalities',
                foreignKey:{name:"fk_id_fridge", allowNull:false}
            })
        }
    }


    Fridges.init({
    id_fridge: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    }, 
    label: {
        type: DataTypes.STRING(20),
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