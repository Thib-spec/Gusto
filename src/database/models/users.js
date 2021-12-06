const {DataTypes, Model } = require("sequelize");
const security = require('../../helpers/security');

module.exports = (sequelize) =>{
class Users extends Model{

static associate(models){
  
    Users.belongsTo(models.Client, {
    foreignKey: 'fk_id_client',
    targetKey: "id_client"
  }) 
  Users.hasMany(models.Sessions, {
    foreignKey: 'fk_id_user',
    sourceKey:"id_user"
  })
  
  Users.belongsTo(models.Levels,{
    foreignKey:"fk_id_level"
  })

  Users.belongsTo(models.Nationalities,{
    foreignKey:"fk_id_nationality"
  })

}

}

Users.init({
    id_user:{
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },
     email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        set(v){
          this.setDataValue('password', security.bcryptHashSync(v))
        }
      },
   
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
},
    {
        sequelize,
        modelName: 'Users',
        timestamps: true,
        createdAt: true,
        updatedAt: true
    })

    return Users

  }

 
