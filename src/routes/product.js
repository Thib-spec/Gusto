const products = require('express').Router();
const productController = require("../controllers/product")
const passport = require("passport")

products.get('/',productController.listProducts)
products.get('/:id', productController.getProductById)
products.post('/',productController.addProduct)
products.put('/:id',productController.editProduct)
products.delete('/:id',productController.deleteProduct)


module.exports = products