const users = require('express').Router();
const userController = require("../controllers/user")
const passport = require("passport")

users.get('/user/:id',userController.getUserById)
users.get('/user', userController.listUsers)
users.post('/user',userController.addUser)
users.put('/user/:id',userController.editUser)
users.delete('/user/:id',userController.deleteUser)
users.post('/user/login',userController.login)
users.get('/users/logout',passport.authenticate("jwt",{session:false}),userController.logout)

module.exports = users