const {Model, DataTypes} = require('sequelize');


module.exports = (sequelize) => {

class Badges extends Model{

    static associate(models){
        
        Badges.belongsTo(models.Client, {
            foreignKey: 'fk_Id_client',
        })
        
        Badges.belongsTo(models.Users, {
            foreignKey: 'fk_Id_user'
        })
        
        // Badges.belongsToMany(Fridges, {
        //   through: "fridges_badges",
        //   foreignKey: "Id_badge",
        // });
    }
}

Badges.init({
    Id_badges: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
},
{
    sequelize,
    modelName: 'Badges',
    timestamps: true,
    createdAt: true,
    updatedAt: true
  })


  return Badges
}
