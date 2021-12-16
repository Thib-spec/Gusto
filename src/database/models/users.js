const {DataTypes, Model } = require("sequelize");
const security = require('../../helpers/security');

module.exports = (sequelize) =>{
class Users extends Model{

static associate(models){
  
    Users.belongsTo(models.Client, {
    foreignKey: {name:'fk_id_client', allowNull:false},
    targetKey: "id_client"
  }) 
  Users.hasMany(models.Sessions, {
    foreignKey: 'fk_id_user',
    sourceKey:"id_user"
  })
  
  Users.belongsTo(models.Levels,{
    foreignKey:{name:"fk_id_level", allowNull:false}
  })

  Users.belongsTo(models.Nationalities,{
    foreignKey:{name:"fk_id_nationality", allowNull:false}
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
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false,
        set(v){
          this.setDataValue('password', security.bcryptHashSync(v))
        }
      },
   
    firstname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    image: {
        type: DataTypes.STRING(50),
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

 
