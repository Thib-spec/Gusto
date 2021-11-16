const {DataTypes, Model } = require("sequelize");
const security = require('../../helpers/security');

module.exports = (sequelize) =>{
class Users extends Model{

static associate(models){
    Users.belongsTo(models.Client, {
    foreignKey: 'fk_Id_client'
  }) 

}

}

Users.init({
    Id_user:{
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },
    
    password: {
        type: DataTypes.STRING,
        set(v){
          this.setDataValue('password', security.bcryptHashSync(v))
        }
      },
    email: {
        type: DataTypes.STRING,
        allowNull: false
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
    user_language: {
        type: DataTypes.STRING,
        allowNull: false
    }
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

 
//   // classMethod

//   /**
//    * recherche user par username
//    * @param {string} username
//    * @returns {user}
//    */
//   Users.findOneByUsername = function(username){
//     return this.findOne({
//       where:{username}
//     })
//  }

//   //instanceMethod

//   /**
//    * validate le password de l'user
//    * @param {string} password
//    * @returns {Boolean}
//    */
//   Users.prototype.isPasswordValid = function (password){
//     return security.bcryptCompareSync(password, this.password)
//   }

//   /**
//   * génère authToken en fonction de l'user
//   * 1. cree une session et la lie avec un jwt
//   * @returns {Promise<jwtToken>}
//   */
//   Users.prototype.genAuthToken = async function () {
//     try {
//       const session = await this.createSession()
//       return security.jwtGenTokenSync({
//         sub: this.id,
//         sessionId:session.id,
//         expiresIn: 3600, // en seconde
//       })
//     } catch (err) {
//       throw err
//     }
//   }

//   /**
//    * Valid un jwtPayload en fonction des sessions existantes
//    * @param {object} payload
//    * @returns {Boolean}
//    */
//   Users.prototype.isAuthTokenPayloadValid = async function (payload) {
//     try {
//       const sessions = await this.getSessions({where:{id:payload.sessionId}})
//       if (sessions.length) return true
//       else return false
//     } catch (err) {
//       throw err
//     }
//   }
//   return Users
