const categories = require('express').Router();
const categoryController = require("../controllers/category")
const passport = require("passport")

categories.get('/',categoryController.listCategories)
categories.get('/user',passport.authenticate("jwt",{session:false}),categoryController.getCategoryForUser)
categories.get('/:id/products/user',passport.authenticate("jwt",{session:false}),categoryController.listProductsByCategoryForUser)

categories.get('/:id', categoryController.getCategoryById)

categories.get('/:id/products',categoryController.listProductByCategory)
categories.post('/',passport.authenticate("jwt",{session:false}),categoryController.addCategory)
categories.put('/:id',categoryController.editCategory)
categories.delete('/:id',categoryController.deleteCategory)


module.exports = categories
