const { session } = require("passport");
const Model = require("../database/models");
const security = require("../helpers/security")
const Joi = require('joi');
// const Model = {
//     Users: require("../database/models/users")(),           // config pour que l'ide propose les fonctions possibles
// }

    exports.listClients = (req, res) => {
        Model.Client.findAll()
        .then(client => res.status(200).json(client))
        .catch(error => res.status(400).json(error))
    }


    exports.getClientById = (req,res) => {
        Model.Client.findOne({
            where:{
                id_client : req.params.id
            }
        })
        .then((client) => {
            if (!client) {
                return res.status(400).json({
                    message: 'Client not found',
                });
            }

            else {
                return res.status(200).json(client)
            }
        })
        .catch(error => res.status(400).json(error))
     
        
    }

    exports.addClient = (req,res) =>{
        const {label} = req.body;


       const postClientSchema = Joi.object().keys({ 
        label: Joi.string().required()
        })

        const result = postClientSchema.validate(req.body)

        const {error } = result;

        const valid = error == null;

        if (!valid) {
        res.status(400).json({ 
            message: 'Missing required parameters',
            info: 'Requires: label' 
        })
        }

    

        else {

        Model.Client.create({
            label: label
        })
        
        .then(client => res.status(200).json(client))
        .catch(error => res.status(400).json(error))
        }
}


exports.editClient = (req,res) => {
    const {label} = req.body;

    Model.Client.findOne({
        where: {
            id_client: req.params.id
        }
    })

    .then((client) => {
        if (!client) {
            return res.status(400).json({
                message: 'Client not found',
            });
        }

        const editClientSchema = Joi.object().keys({ 
            label: Joi.string()
        })

        const result = editClientSchema.validate(req.body)

        const {error } = result; 
        const valid = error == null; 
        if (!valid) { 
          res.status(400).json({ 
            message: 'One or more fields are not well written', 
          }) 
        } 
        
        else { 
            Model.Client.update({
                label: label
            },
            {
                where : {
                    id_client: req.params.id
                }
            })
            return res.send("Modification apply")
        }
    })
    
    .catch(error => console.log(error))
}
        

exports.deleteClient = (req,res) => {
    
            Model.Client.findOne({
                where: {
                    id_client: req.params.id
                }
            })
            .then((client) => {
                if (!client) {
                    return res.status(400).json({
                        message: 'Client not found',
                    });
                }
            Model.Client
                    .destroy({
                        where: {
                            id_client: req.params.id
                        }
                    }).then(() => res.send(`Client with id : ${req.params.id} has been deleted`))
                }

            )
            .catch(error => res.status(400).json(error))
        }
