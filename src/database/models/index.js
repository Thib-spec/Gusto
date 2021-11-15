'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const db = {};

// config de sequelize pour se connecter a la db
const sequelizeOptions = {
  logging: false // enlève les prints des requêtes sql dans la console
}
const sequelize = new Sequelize({
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  database: config.database,
  username: config.username,
  password: config.password, 
  ...sequelizeOptions
});

// but : require(/path/to/models).User
// but : require(/path/to/models).Map
// etc.
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    console.log(file)
    const model = require(path.join(__dirname, file))(sequelize);
    console.log(model)
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// -------------------------------------------------- //

// config la synchronisation de la db avec les schemas des models en fonctions de l'environnement de travail
let syncOptions
if (env=="development"){
  syncOptions = {
    alter: true, // si true : change la db en fonctions d'ajout de key dans les schemas des models
    force: false // si true : drop the tables et recrée avec les nouveaux schemas des models
  }
}
else if (env="test"){
  syncOptions = {
    alter: false,
    force: false
  }
}
else if (env="production"){
  // en productions => il faut utiliser les migrations et non alter et force
  syncOptions = {
    alter: false,
    force: false
  }
}

// si connecter, synchronisation de la db avec les schemas des models
sequelize.authenticate()
.then(()=>{
  console.log('connected to db')
  // synchronise les schemas des models avec la db actuel
  sequelize.sync(syncOptions)
  .then(()=>{
    console.log("All models were synchronized successfully.");
  })
  .catch(err=>{
    console.error('Error in the synchronization of all models :')
    console.log(err)
  })
})
.catch(err=>{
  console.error('error to connection to db : \n', err)
})

// -------------------------------------------------- //

module.exports = db;
