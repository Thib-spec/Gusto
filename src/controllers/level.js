const { session } = require("passport");
const Model = require("../database/models");
const security = require("../helpers/security")
const Joi = require('joi');
// const Model = {
//     Users: require("../database/models/users")(),           // config pour que l'ide propose les fonctions possibles
// }

    exports.listLevels = (req, res) => {
        Model.Levels.findAll()
        .then(level => res.status(200).json(level))
        .catch(error => res.status(400).json(error))
    }

    exports.addLevels = (req,res) =>{
        const {label} = req.body;


       const postLevelSchema = Joi.object().keys({ 
        label: Joi.string().required()
        })

        const result = postLevelSchema.validate(req.body)

        const {error } = result;

        const valid = error == null;

        if (!valid) {
        res.status(400).json({ 
            message: 'Missing required parameters',
            info: 'Requires: label' 
        })
        }

    

        else {

        Model.Levels.create({
            label: label
        })
        
        .then(level => res.status(200).json(level))
        .catch(error => res.status(400).json(error))
        }
}


exports.editLevels = (req,res) => {
    const {label} = req.body;

    Model.Levels.findOne({
        where: {
            id_level: req.params.id
        }
    })

    .then((level) => {
        if (!level) {
            return res.status(400).json({
                message: 'Level not found',
            });
        }

        const editLevelSchema = Joi.object().keys({ 
            label: Joi.string()
        })

        const result = editLevelSchema.validate(req.body)

        const {error } = result; 
        const valid = error == null; 
        if (!valid) { 
          res.status(400).json({ 
            message: 'One or more fields are not well written', 
          }) 
        } 
        
        else { 
            Model.Levels.update({
                label: label
            },
            {
                where : {
                    id_level: req.params.id
                }
            })
            return res.send("Modification apply")
        }
    })
    
    .catch(error => console.log(error))
}
        

exports.deleteLevels = (req,res) => {
    
            Model.Levels.findOne({
                where: {
                    id_level: req.params.id
                }
            })
            .then((level) => {
                if (!level) {
                    return res.status(400).json({
                        message: 'Level not found',
                    });
                }
            Model.Levels
                    .destroy({
                        where: {
                            id_level: req.params.id
                        }
                    }).then(() => res.send(`Level with id : ${req.params.id} has been deleted`))
                }

            )
            .catch(error => res.status(400).json(error))
        }
