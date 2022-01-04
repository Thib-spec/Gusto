const sales = require('express').Router();
const salesController = require("../controllers/sales")

sales.get('/',salesController.listSales)
sales.get('/:id', salesController.getSaleById)

sales.post('/',salesController.addSale)

sales.delete('/:id',salesController.deleteSale)

sales.post("/:id/addProduct",salesController.addProductInSale)


module.exports = sales