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

exports.addTag = (req,res) =>{
    const {id_tag,fk_id_product,fk_id_client} = req.body

    const list_fk_product = new Array()
    const list_fk_client = new Array()

    const postTagSchema = Joi.object().keys({
        id_tag:Joi.number().required(), 
        fk_id_product : Joi.number().required(),
        fk_id_client: Joi.number().required()
    })

    const result = postTagSchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    if (!valid) {
      res.status(400).json({ 
        message: 'Missing required parameters or parameters type are incorrect',
        info: 'Requires: id_tag, fk_id_product, fk_id_client' 
      })
    }

    else {

        Model.Products.findAll()
        .then(allproduct => {
            Model.Products.count()
            .then(numberOfProduct => {
                for (let i =0; i<numberOfProduct;i++){
                    list_fk_product.push(allproduct[i].id_product)
                }

                Model.Client.findAll()
                .then(allClient => {
                    Model.Client.count()
                    .then(numberOfClient => {
                        for (let j =0; j<numberOfClient;j++){
                            list_fk_client.push(allClient[j].id_client)
                        }

                        if(!list_fk_client.includes(fk_id_client)){
                            res.status(400).json({
                                message:"fk_id_client does not match any id_client"
                            })
                        }

                        else if (!list_fk_product.includes(fk_id_product)){
                            res.status(400).json({
                                message: "fk_id_product does not match any id_product"
                            })
                        }

                        else {
                            Model.Tags.create({
                                id_tag:id_tag.toUpperCase(),
                                fk_id_product : fk_id_product,
                                fk_id_client: fk_id_client
                            })

                            .then(tag => res.status(200).json(tag))
                            .catch(error => res.status(400).json(error))
                        }

                    })
                })
            })
        })
    
    }

        
}


// AFAIRE
exports.editTag =(req,res) => {

    const {fk_id_product,fk_id_client} = req.body

    const list_fk_product = new Array()
    const list_fk_client = new Array()

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
        
        else if(Object.keys(req.body).length == 0){
            res.status(400).json({
                message:"No parameters were passed"
            })
        }
        
        else {
            
            Model.Products.findAll()
            .then(allProduct => {
                Model.Products.count()
                .then(numberOfProduct => {
                    for(let i =0;i<numberOfProduct;i++){
                        list_fk_product.push(allProduct[i].id_product)
                    }

                    Model.Client.findAll()
                    .then(allClient => {
                        Model.Client.count()
                        .then(numberOfClient => {
                            for(let j =0;j<numberOfClient;j++){
                                list_fk_client.push(allClient[j].id_client)
                            }

                            if(!list_fk_client.includes(fk_id_client) && fk_id_client){
                                res.status(400).json({
                                    message: "fk_id_client does not match any id_client"
                                })
                            }

                            else if (!list_fk_product.includes(fk_id_product)&& fk_id_product){
                                res.status(400).json({
                                    message: "fk_id_product does not match any id_product"
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
                                .then(res.status(200).json({
                                    message: "Item has been updated"})
                                )
                                .catch(error => res.status(400).json(error))
                            }
                        })
                    })
                })            
            })

          
        }
    })
    
    

}