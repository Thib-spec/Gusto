const Model = require("../database/models");
const Joi = require('joi');

// const Model = {
//     Categories: require("../database/models/categories")(),           // config pour que l'ide propose les fonctions possibles
// }

exports.listStates = (req, res) => {
    Model.State.findAll()
    .then(state => res.status(200).json(state))
    .catch(error => res.status(400).json(error))
}

exports.getStateById = (req,res) => {
    Model.State.findOne({
        where:{
            id_state : req.params.id
        }
    })
    .then((state) => {
        if (!state) {
            return res.status(400).json({
                message: 'State does not exist',
            });
        }

        else {
            return res.status(200).json(state)
        }
    })
    .catch(error => res.json(error))
 
    
}



exports.addState = (req,res) =>{
    const {label} = req.body

    const postStateSchema = Joi.object().keys({ 
        label : Joi.string().required()
    })

    const result = postStateSchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    if (!valid) {
      res.status(400).json({ 
        message: 'Missing required parameters or parameters type are incorrect',
        info: 'Requires: label /n' 
      })
    }

    else {
        
        Model.State.create({
        label : label
    })

    .then(state => res.status(200).json(state))
    .catch(error => res.status(400).json(error))

    }

        
}

exports.editState =(req,res) => {

    const {label} = req.body

    Model.State.findOne({
        where: {
            id_state: req.params.id
        }
    })

    .then((state) => {
        if (!state) {
            return res.status(400).json({
                message: 'State does not exist',
            });
        }

        const editStateSchema = Joi.object().keys({ 
            label : Joi.string()
        })

        const result = editStateSchema.validate(req.body)

        const {error } = result; 
        const valid = error == null; 
        if (!valid) { 
          res.status(400).json({ 
            message: 'One or more fields are not well written', 
          }) 
        } 
        
        else { 
            Model.State.update({
                label : label
            },
            {
                where : {
                    id_state: req.params.id
                }
            })
            .then(res.send("Modification apply"))
        }
    })
    
    .catch(error => console.log(error))

}


exports.deleteState = (req,res) => {
    
    Model.State.findOne({
        where: {
            id_state: req.params.id
        }
    })
    .then((state) => {
        if (!state) {
            return res.status(400).json({
                message: 'State does not exist',
            });
        }
    Model.State
            .destroy({
                where: {
                    id_state: req.params.id
                }
            }).then(res.send(`State with id : ${req.params.id} has been deleted`))
        }

    )
    .catch(error => res.status(400).json(error))
}
