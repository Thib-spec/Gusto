const users = require("../database/models/users");


module.exports = {

    listUsers (req, res) {
        // return users
        //     .then((users) => res.status(200).json(users))
        //     .catch((error) => {
        //         console.log(error);
        //         return res.status(500).json({ message: 'Internal error' });
        //     });
        res.send("hello")
    }
}