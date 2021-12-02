const fridgePreset = require('express').Router();
const fridgePresetController = require("../controllers/fridgePreset")
const passport = require("passport")

fridgePreset.post('/:id/addProduct',fridgePresetController.addFrontProduct)
fridgePreset.put('/:id/editProduct/:productId',fridgePresetController.editFrontProduct)
fridgePreset.delete('/:id/removeProduct/:productId',fridgePresetController.removeProduct)



module.exports = fridgePreset