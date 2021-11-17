const users = require('express').Router();
const userController = require("../controllers/user")

users.get('/user/:id',userController.getUserById)
users.get('/users', userController.listUsers)
users.post('/user',userController.addUser)
users.put('/user/:id',userController.editUser)
users.delete('/user/:id',userController.deleteUser)

module.exports = users