const Model = require("../database/models");
const Joi = require('joi');

// Retourne l'ensemble des technologies

exports.listTechnologies = (req, res) => {
    Model.Technologies.findAll()
    .then(technologies => res.status(200).json(technologies))
    .catch(error => res.status(400).json(error))
}

// Récupère une technologie par son id

exports.getTechnologiesById = (req,res) => {
    Model.Technologies.findOne({
        where:{
            id_technologies : req.params.id
        }
    })
    .then((technologies) => {
        if (!technologies) {
            return res.status(400).json({
                message: 'Technology does not exist',
            });
        }

        else {
            return res.status(200).json(technologies)
        }
    })
    .catch(error => res.json(error))
 
    
}


// Ajoute une technologie

exports.addTechnologies = (req,res) =>{
    const {label} = req.body
    let list_label = []

    const postTechnologiesSchema = Joi.object().keys({ 
        label : Joi.string().required()
    })

    const result = postTechnologiesSchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    if (!valid) {
      res.status(400).json({ 
        message: 'Missing required parameters or parameters type are incorrect',
        info: 'Requires: label' 
      })
    }

    else {

        Model.Technologies.findAll()
        .then(allTechnologies => {
            Model.Technologies.count()
            .then(numberOfTechnologies => {
                for(let i =0;i<numberOfTechnologies;i++){
                    list_label.push(allTechnologies[i].label.toLowerCase())
                }

                if(list_label.includes(label.toLowerCase())){
                    res.status(400).json({
                        message: "Label already exists"
                    })
                }

                else {
                    Model.Technologies.create({
                        label : label
                    })

                    .then(technologies => res.status(200).json(technologies))
                    .catch(error => res.status(400).json(error))
                }
            })
        })
    
    }
}

// Modifie une technologie

exports.editTechnologies =(req,res) => {

    const {label} = req.body

    Model.Technologies.findOne({
        where: {
            id_technologies: req.params.id
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
        
        else if(Object.keys(req.body).length == 0){
            res.status(400).json({
                message:"No parameters were passed"
            })
        }
        
        else { 
            Model.Technologies.update({
                label : label
            },
            {
                where : {
                    id_technologies: req.params.id
                }
            })
            .then(res.status(200).json({
                message: "Item has been updated"})
            )
            .catch(error => console.log(error))
        }
    })

}

// Supprime une technologie

exports.deleteTechnologies= (req,res) => {
    
    Model.Technologies.findOne({
        where: {
            id_technologies: req.params.id
        }
    })
    .then((technologies) => {
        if (!technologies) {
            return res.status(400).json({
                message: 'Technologies does not exist',
            });
        }

        else {
            Model.Technologies.destroy({
                where: {
                    id_technologies: req.params.id
                }
            })
            .then(res.status(200).json({

                message: `Technologies with id : ${req.params.id} has been deleted`})
            )
            .catch(error => res.status(400).json(error))
        }
    })
    
    
}
