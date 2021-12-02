const fridges = require('express').Router();
const fridgeController = require("../controllers/fridge")
const passport = require("passport")

fridges.get('/',fridgeController.listFridges)
fridges.get('/:id',fridgeController.getFridgeById)
fridges.post('/',fridgeController.addFridge)
fridges.put('/:id',fridgeController.editFridge)
fridges.delete('/:id',fridgeController.deleteFridge)
fridges.get('/:id/sales/products',fridgeController.listProductsBySaleByFridge)

fridges.get('/:id/products',fridgeController.listProductByFridge)

fridges.get('/:id/clients',fridgeController.listClientByFridge)
fridges.get('/:id/badges',fridgeController.listBadgeByFridge)
fridges.get('/:id/menus',fridgeController.listMenuByFridge)
fridges.get('/:id/orders/products',fridgeController.listProductByOrderByFridge)

module.exports = fridges