const clients = require('express').Router();
const clientController = require("../controllers/client")
const passport = require("passport")

clients.get('/',clientController.listClients)
clients.get('/:id',clientController.getClientById)
clients.post('/',clientController.addClient)
clients.put('/:id',clientController.editClient)
clients.delete('/:id',clientController.deleteClient)

module.exports = clients