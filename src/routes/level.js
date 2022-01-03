const levels = require('express').Router();
const levelController = require("../controllers/level")

levels.get('/',levelController.listLevels)
levels.post('/',levelController.addLevels)
levels.put('/:id',levelController.editLevels)
levels.delete('/:id',levelController.deleteLevels)

module.exports = levels