const users = require('express').Router();
const userController = require("../controllers/user")
const passport = require("passport")

users.post('/login',userController.login)
users.get('/logout',passport.authenticate("jwt",{session:false}),userController.logout)
users.get('/userInfo',userController.userInfo)

users.get('/:id',userController.getUserById)
users.get('/', userController.listUsers)
users.get('/level/:label', userController.listUserByLevel)


users.get("/:id/nationality",userController.getUserNationality)
users.post('/',userController.addUser)
users.put('/:id',userController.editUser)
users.delete('/:id',userController.deleteUser)


module.exports = users