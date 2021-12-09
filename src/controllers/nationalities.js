const Model = require("../database/models");
const Joi = require('joi');


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
    const list_nationality = new Array() 

    const postNationalitySchema = Joi.object().keys({ 
        label : Joi.string().required()
    })

    const result = postNationalitySchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    if (!valid) {
      res.status(400).json({ 
        message: 'Missing required parameters or parameters type are incorrect',
        info: 'Requires: label' 
      })
    }

    else {

        Model.Nationalities.findAll()
        .then(allNationalities => {
            Model.Nationalities.count()
            .then(numberOfNationalities => {
                for(let i =0;i<numberOfNationalities;i++){
                    list_nationality.push(allNationalities[i].label)
                }

                if(list_nationality.includes(label)){
                    res.status(400).json({
                        message: "Nationality already exists"
                    })
                }

                else {
                    Model.Nationalities.create({
                        label : label 
                    })

                    .then(nationality => res.status(200).json(nationality))
                    .catch(error => res.status(400).json(error))
                }
           
            })
        
        })
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
        
        else if(Object.keys(req.body).length == 0){
            res.status(400).json({
                message:"No parameters were passed"
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
            .then(res.status(200).json({
                message : "Item has been updated"})
            )
            .catch(error => console.log(error))
        }
    })

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

        else {
            Model.Nationalities
            .destroy({
                where: {
                    id_nationality: req.params.id
                }
            })
            .then(res.status(200).json({
                message: `Nationality with id : ${req.params.id} has been deleted`})
            )
            .catch(error => res.status(400).json(error))
        }
    })
    
}