const users = require('express').Router();
const userController = require("../controllers/user")
const passport = require("passport")

users.get('/:id',userController.getUserById)
users.get('/', userController.listUsers)
users.get('/level/:label', userController.listUserByLevel)
users.post('/',userController.addUser)
users.put('/:id',userController.editUser)
users.delete('/:id',userController.deleteUser)
users.post('/login',userController.login)
users.get('/logout',passport.authenticate("jwt",{session:false}),userController.logout)

module.exports = users