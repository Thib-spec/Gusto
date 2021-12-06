const python = require('express').Router();
const pythonController = require("../controllers/python")
const passport = require("passport")

python.get('/',pythonController.callName)


module.exports = python