const Model = require("../database/models");
// const Model = {
//     Users: require("../database/models/users")(),           // config pour que l'ide propose les fonctions possibles
// }


    exports.listUsers = (req, res) => {
        Model.Users.findAll()
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json(error))
    }


    exports.getUserById = (req,res) => {
        console.log("ok")
        Model.Users.findOne({
            where:{
                Id_user : req.params.id
            }
        })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json(error))
     
        
    }
