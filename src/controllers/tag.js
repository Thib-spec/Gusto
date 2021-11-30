const Model = require("../database/models");
const Joi = require('joi');

// const Model = {
//     Categories: require("../database/models/categories")(),           // config pour que l'ide propose les fonctions possibles
// }

exports.listTags = (req, res) => {
    Model.Tags.findAll()
    .then(tag => res.status(200).json(tag))
    .catch(error => res.status(400).json(error))
}



exports.getTagById = (req,res) => {
    Model.Tags.findOne({
        where:{
            id_tag : req.params.id
        }
    })
    .then((tag) => {
        if (!tag) {
            return res.status(400).json({
                message: 'Tag does not exist',
            });
        }

        else {
            return res.status(200).json(tag)
        }
    })
    .catch(error => res.json(error))
 
    
}

// Verif avec les valeurs des fk

exports.addTag = (req,res) =>{
    const {fk_id_product,fk_id_client} = req.body

    const postTagSchema = Joi.object().keys({ 
        fk_id_product : Joi.number().required(),
        fk_id_client: Joi.number().required()
    })

    const result = postTagSchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    if (!valid) {
      res.status(400).json({ 
        message: 'Missing required parameters or parameters type are incorrect',
        info: 'Requires: fk_id_product, fk_id_client' 
      })
    }

    else {
        
        Model.Tags.create({
        fk_id_product : fk_id_product,
        fk_id_client: fk_id_client
    })

    .then(tag => res.status(200).json(tag))
    .catch(error => res.status(400).json(error))

    }

        
}


exports.editTag =(req,res) => {

    const {fk_id_product,fk_id_client} = req.body

    Model.Tags.findOne({
        where: {
            id_tag: req.params.id
        }
    })

    .then((tag) => {
        if (!tag) {
            return res.status(400).json({
                message: 'Tag does not exist',
            });
        }

        const editTagSchema = Joi.object().keys({ 
            fk_id_product : Joi.number(),
            fk_id_client: Joi.number()
        })

        const result = editTagSchema.validate(req.body)

        const {error } = result; 
        const valid = error == null; 
        if (!valid) { 
          res.status(400).json({ 
            message: 'One or more fields are not well written', 
          }) 
        } 
        
        else { 
            Model.Tags.update({
                fk_id_product : fk_id_product,
                fk_id_client:fk_id_client
            },
            {
                where : {
                    id_tag: req.params.id
                }
            })
            .then(res.send("Modification apply"))
        }
    })
    
    .catch(error => console.log(error))

}