const users = require('express').Router();
const userController = require("../controllers/user")

users.get('/', userController.listUsers)

module.exports = users