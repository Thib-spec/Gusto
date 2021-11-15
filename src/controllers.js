const Users = require("./database/models/users");

const commonsController = require('./controllers/common');

module.exports = {
    list (req, res) {
        return commonsController.list(req, res, Users);
    }
}