const {Model, DataTypes} = require('sequelize');

/* -------------------------------------- */
/* L'ensemble des fichiers dans le dossier "models" sont constitués de la même manière */
/* On définit d'abord nos associations one-to-many/ many-to-many ... en spécifiant les foreign keys */
/* On initialise ensuite notre model en lui passant les différents attributs avec diverses options (clef primaire / type / non null ...) */
/* -------------------------------------- */


module.exports = (sequelize) => {

class Badges extends Model{  

    static associate(models){
        
        Badges.belongsTo(models.Client, {
            foreignKey: 'fk_id_client',
        })
        
        Badges.belongsTo(models.Users, {
            foreignKey: 'fk_id_user'
        })
        
        Badges.belongsToMany(models.Fridges,{       
            through:"fridges_badges",
            foreignKey:{name:"fk_id_badge", allowNull:false}
        })
    }
}

Badges.init({
    id_badges: {
        type: DataTypes.STRING,
        primaryKey: true,
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
