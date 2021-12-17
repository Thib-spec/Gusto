const menus = require('express').Router();
const menuController = require("../controllers/menu")
const passport = require("passport")

menus.get('/:id',menuController.getMenuById)
menus.get('/', menuController.listMenus)
menus.get('/:id/product', menuController.listProductByMenu)
menus.post('/',passport.authenticate("jwt",{session:false}),menuController.addMenu)

menus.post("/:id/products",menuController.addProductInMenu)
menus.delete("/:id/removeProduct",menuController.deleteProductInMenu)

menus.put('/:id',menuController.editMenu)
menus.delete('/:id',menuController.deleteMenu)

module.exports = menus