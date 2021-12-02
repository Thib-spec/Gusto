const {Model, DataTypes} = require('sequelize');


module.exports = (sequelize) => {

class Badges extends Model{         // passer badge en binary

    static associate(models){
        
        Badges.belongsTo(models.Client, {
            foreignKey: 'fk_id_client',
        })
        
        Badges.belongsTo(models.Users, {
            foreignKey: 'fk_id_user'
        })
        
        Badges.belongsToMany(models.Fridges,{       
            through:"fridges_badges",
            foreignKey:"fk_id_badge"
        })
    }
}

Badges.init({
    id_badges: {
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
