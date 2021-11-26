const states = require('express').Router();
const stateController = require("../controllers/state")
const passport = require("passport")

states.get('/:id',stateController.getStateById)
states.get('/', stateController.listStates)
states.post('/',stateController.addState)
states.put('/:id',stateController.editState)
states.delete('/:id',stateController.deleteState)

module.exports = states