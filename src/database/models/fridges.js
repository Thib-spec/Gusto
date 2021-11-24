const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Fridges extends Model{
        static associate(models){

            Fridges.belongsTo(models.Technologies, {
                foreignKey: 'fk_id_technology'
            });

            Fridges.belongsToMany(models.Client,{  
                as: "clients",    
                through:"clients_fridges",
                foreignKey:"fk_id_client"
            })

            Fridges.belongsToMany(models.Badges,{
                as:"badges",       
                through:"fridges_badges",
                foreignKey:"fk_id_badge"
            })

            Fridges.belongsToMany(models.State,{
                through:"fridges_states",
                foreignKey:"fk_id_state"
            })

            Fridges.belongsToMany(models.Products,{
                as: "products",
                through:'fridges_products',
                foreignKey:"fk_id_product",
            })

            Fridges.belongsToMany(models.Menus,{
                as:"menus",
                through:"fridges_menus",
                foreignKey:"fk_id_menu"
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