const categories = require('express').Router();
const categoryController = require("../controllers/category")
const passport = require("passport")

categories.get('/',categoryController.listCategories)
categories.get('/:id', categoryController.getCategoryById)
categories.post('/',categoryController.addCategory)
// category.put('/category/:id',categoryController.editcategory)
// category.delete('/category/:id',categoryController.deletecategory)


module.exports = categories