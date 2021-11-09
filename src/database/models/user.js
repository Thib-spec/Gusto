'use strict';
const {
  Model, DataTypes
} = require('sequelize');

const security = require('../../helpers/security')

module.exports = (sequelize) => {

  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here


      // ---------- Session relation ---------- //

      // Session relation
      this.hasMany(models.Session,{
        as: 'sessions',
        foreignKey: {
          name: 'userId',
          allowNull: false
        },
        sourceKey:'id',
        onDelete: "cascade"
      })

    }
  };

  User.init({
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set(v){
        this.setDataValue('password', security.bcryptHashSync(v))
      }
    },
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    createdAt: true,
    updatedAt: true
  });

  // classMethod

  /**
   * recherche user par username
   * @param {string} username
   * @returns {user}
   */
  User.findOneByUsername = function(username){
    return this.findOne({
      where:{username}
    })
  }

  //instanceMethod

  /**
   * validate le password de l'user
   * @param {string} password
   * @returns {Boolean}
   */
  User.prototype.isPasswordValid = function (password){
    return security.bcryptCompareSync(password, this.password)
  }

  /**
  * génère authToken en fonction de l'user
  * 1. cree une session et la lie avec un jwt
  * @returns {Promise<jwtToken>}
  */
  User.prototype.genAuthToken = async function () {
    try {
      const session = await this.createSession()
      return security.jwtGenTokenSync({
        sub: this.id,
        sessionId:session.id,
        expiresIn: 3600, // en seconde
      })
    } catch (err) {
      throw err
    }
  }

  /**
   * Valid un jwtPayload en fonction des sessions existantes
   * @param {object} payload
   * @returns {Boolean}
   */
  User.prototype.isAuthTokenPayloadValid = async function (payload) {
    try {
      const sessions = await this.getSessions({where:{id:payload.sessionId}})
      if (sessions.length) return true
      else return false
    } catch (err) {
      throw err
    }
  }

  return User
};