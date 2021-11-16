const Model = require("../database/models");
// const Model = {
//     Users: require("../database/models/users")(),           // config pour que l'ide propose les fonctions possibles
// }



const {DataTypes,sequelize } = require("sequelize");


    exports.listUsers = (req, res) => {
        Model.Users.findAll()
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
