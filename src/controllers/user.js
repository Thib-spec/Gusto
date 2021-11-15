const Users = require("../database/models/users");
const {DataTypes,sequelize, Model } = require("sequelize");



    exports.listUsers = (req, res) => {
        console.log(Users)
        Model.findAll()
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json(error))
        // return users
        //     .then((users) => res.status(200).json(users))
        //     .catch((error) => {
        //         console.log(error);
        //         return res.status(500).json({ message: 'Internal error' });
        //     });
        // res.send("hello")
    }
