const fridgePreset = require('express').Router();
const fridgePresetController = require("../controllers/fridgePreset")
const passport = require("passport")


fridgePreset.get('/',fridgePresetController.listFridgePreset)
fridgePreset.get('/:id',fridgePresetController.getFridegPresetById)
fridgePreset.post('/',fridgePresetController.addFridgePreset)
fridgePreset.put('/:id',fridgePresetController.editFridgePreset)
fridgePreset.delete('/:id',fridgePresetController.deleteFridgePreset)


fridgePreset.post('/:id/addProduct',fridgePresetController.addFrontProduct)
fridgePreset.put('/:id/editProduct/:productId',fridgePresetController.editFrontProduct)
fridgePreset.delete('/:id/removeProduct/:productId',fridgePresetController.removeProduct)



module.exports = fridgePreset