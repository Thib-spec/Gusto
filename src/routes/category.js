const categories = require('express').Router();
const categoryController = require("../controllers/category")
const passport = require("passport")

// Pour toutes les routes où l'on a besoin des informations de l'utilisateur connecté, on spécifie une authentification avec passport
// Cela nous permet d'indiquer en header de la requête le token qui nous est renvoyé lorsqu'un utilisateur se connecte
// Ceci nous permet donc de récupérer les infos de l'utilisateur connecté

categories.get('/',categoryController.listCategories)
categories.get('/user',passport.authenticate("jwt",{session:false}),categoryController.getCategoryForUser)
categories.get('/:id/products/user',passport.authenticate("jwt",{session:false}),categoryController.listProductsByCategoryForUser)

categories.get('/:id', categoryController.getCategoryById)

categories.get('/:id/products',categoryController.listProductByCategory)
categories.post('/',passport.authenticate("jwt",{session:false}),categoryController.addCategory)
categories.put('/:id',categoryController.editCategory)
categories.delete('/:id',categoryController.deleteCategory)


module.exports = categories
