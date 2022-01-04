const technologies = require('express').Router();
const technologiesController = require("../controllers/technologies")


technologies.get('/:id',technologiesController.getTechnologiesById)
technologies.get('/', technologiesController.listTechnologies)
technologies.post('/',technologiesController.addTechnologies)
technologies.put('/:id',technologiesController.editTechnologies)
technologies.delete('/:id',technologiesController.deleteTechnologies)

module.exports = technologies