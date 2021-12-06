const Model = require("../database/models");
const Joi = require('joi');

// const Model = {
//     Categories: require("../database/models/categories")(),           // config pour que l'ide propose les fonctions possibles
// }

exports.listNationalities = (req, res) => {
    Model.Nationalities.findAll()
    .then(nationality => res.status(200).json(nationality))
    .catch(error => res.status(400).json(error))
}

exports.getNationalityById = (req,res) => {
    Model.Nationalities.findOne({
        where:{
            id_nationality : req.params.id
        }
    })
    .then((nationality) => {
        if (!nationality) {
            return res.status(400).json({
                message: 'Nationality does not exist',
            });
        }

        else {
            return res.status(200).json(nationality)
        }
    })
    .catch(error => res.json(error))
 
    
}



exports.addNationality = (req,res) =>{
    const {label} = req.body

    const postNationalitySchema = Joi.object().keys({ 
        label : Joi.string().required()
    })

    const result = postNationalitySchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    if (!valid) {
      res.status(400).json({ 
        message: 'Missing required parameters or parameters type are incorrect',
        info: 'Requires: label /n' 
      })
    }

    else {
        
        Model.Nationalities.create({
        label : label
    })

    .then(nationality => res.status(200).json(nationality))
    .catch(error => res.status(400).json(error))

    }

        
}

exports.editNationality =(req,res) => {

    const {label} = req.body

    Model.Nationalities.findOne({
        where: {
            id_nationality: req.params.id
        }
    })

    .then((nationality) => {
        if (!nationality) {
            return res.status(400).json({
                message: 'Nationality does not exist',
            });
        }

        const editNationalitySchema = Joi.object().keys({ 
            label : Joi.string()
        })

        const result = editNationalitySchema.validate(req.body)

        const {error } = result; 
        const valid = error == null; 

        if (!valid) { 
          res.status(400).json({ 
            message: 'One or more fields are not well written', 
          }) 
        } 
        
        else { 
            Model.Nationalities.update({
                label : label
            },
            {
                where : {
                    id_nationality: req.params.id
                }
            })
            .then(res.status(200).json("Modification apply"))
        }
    })
    
    .catch(error => console.log(error))

}


exports.deleteNationality = (req,res) => {
    
    Model.Nationalities.findOne({
        where: {
            id_nationality: req.params.id
        }
    })
    .then((nationality) => {
        if (!nationality) {
            return res.status(400).json({
                message: 'Nationality does not exist',
            });
        }
    Model.Nationalities
            .destroy({
                where: {
                    id_nationality: req.params.id
                }
            }).then(res.send(`Nationality with id : ${req.params.id} has been deleted`))
        }

    )
    .catch(error => res.status(400).json(error))
}