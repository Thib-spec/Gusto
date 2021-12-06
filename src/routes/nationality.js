const nationality = require('express').Router();
const nationalityController = require("../controllers/nationalities")
const passport = require("passport")

nationality.get('/:id',nationalityController.getNationalityById)
nationality.get('/', nationalityController.listNationalities)
nationality.post('/',nationalityController.addNationality)
nationality.put('/:id',nationalityController.editNationality)
nationality.delete('/:id',nationalityController.deleteNationality)

module.exports = nationality