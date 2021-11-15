const user = require('express').Router();
const userController = require('./controllers');
const  models  = require('./database/models');

// GET routes
user.get('/', function(req,res){
    models.Users.findAll().then((users) => res.json({users}))
});

module.exports = user;

