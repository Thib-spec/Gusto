'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

     // ---------- Session relation ---------- //
     
      this.belongsTo(models.User, {
        as: 'user',
        foreignKey: {
          name: "userId",
          allowNull: false
        },
        targetKey: 'id',
				onDelete: "cascade"
      })
    }
  };
  Session.init({
    
  }, {
    sequelize,
    modelName: 'Session',
  });
  return Session;
};