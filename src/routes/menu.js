const menus = require('express').Router();
const menuController = require("../controllers/menu")
const passport = require("passport")

menus.get('/:id',menuController.getMenuById)
menus.get('/', menuController.listMenus)
menus.get('/:id/products', menuController.listProductByMenu)
menus.post('/',menuController.addMenu)
menus.put('/:id',menuController.editMenu)
menus.delete('/:id',menuController.deleteMenu)

module.exports = menus