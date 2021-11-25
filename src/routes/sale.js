const sales = require('express').Router();
const salesController = require("../controllers/sales")
const passport = require("passport")

sales.get('/',salesController.listSales)
sales.get('/:id', salesController.getSaleById)
sales.get('/:id/products',salesController.listProductsBySales)
sales.post('/',salesController.addSale)
sales.put('/:id',salesController.editSale)
sales.delete('/:id',salesController.deleteSale)


module.exports = sales