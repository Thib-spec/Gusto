const fridgePreset = require('express').Router();
const fridgePresetController = require("../controllers/fridgePreset")
const passport = require("passport");
const fridgePresets = require('../database/models/fridgePresets');


fridgePreset.get('/',fridgePresetController.listFridgePreset)
fridgePreset.get('/:id',fridgePresetController.getFridegPresetById)

fridgePreset.get("/:id/product",fridgePresetController.getProductinPreset)
fridgePreset.post('/',passport.authenticate("jwt",{session:false}),fridgePresetController.addFridgePreset)
fridgePreset.put('/:id',fridgePresetController.editFridgePreset)
fridgePreset.delete('/:id',fridgePresetController.deleteFridgePreset)


fridgePreset.post('/:id/addProduct',fridgePresetController.addFrontProduct)
fridgePreset.put('/:id/editProduct',fridgePresetController.editFrontProduct)
fridgePreset.delete('/:id/removeProduct',fridgePresetController.removeProduct)

fridgePreset.get("/:id/menus",fridgePresetController.getMenuByFridgePreset)
fridgePreset.post("/:id/addMenu",fridgePresetController.addMenuInPreset)
fridgePreset.delete("/:id/removeMenu/:menuId",fridgePresetController.removeMenuPreset)



module.exports = fridgePreset