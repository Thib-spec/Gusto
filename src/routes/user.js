const users = require('express').Router();
const userController = require("../controllers/user")

users.get('/users', userController.listUsers)

module.exports = users