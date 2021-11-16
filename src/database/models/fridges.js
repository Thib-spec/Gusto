const {DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
    class Fridges extends Model{
        static associate(models){

            Fridges.belongsTo(models.Technologies, {
                foreignKey: 'fk_Id_tech'
            });

            Fridges.belongsToMany(models.Client,{      
                through:"clients_fridges",
                foreignKey:"fk_Id_client"
            })

            Fridges.belongsToMany(models.Badges,{       
                through:"fridges_badges",
                foreignKey:"fk_Id_badge"
            })
        }
    }


    Fridges.init({
    Id_fridge: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Status:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    Label: {
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