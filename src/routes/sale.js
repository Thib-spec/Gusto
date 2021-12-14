const sales = require('express').Router();
const salesController = require("../controllers/sales")
const passport = require("passport")

sales.get('/',salesController.listSales)
sales.get('/:id', salesController.getSaleById)

sales.post('/',salesController.addSale)
sales.put('/:id',salesController.editSale)
sales.delete('/:id',salesController.deleteSale)

sales.post("/:id/addProduct",salesController.addProductInSale)


module.exports = sales