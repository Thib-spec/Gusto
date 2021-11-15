const { Sequelize, DataTypes, Deferrable } = require('sequelize');

const sequelize = new Sequelize('GustoBDD', 'root', 'Gusto@solutions', {
    host: 'localhost',
    dialect:'mysql'
  });

  module.exports = {
    sequelize,
    DataTypes,
    Deferrable
}