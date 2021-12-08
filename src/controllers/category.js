const Model = require("../database/models");
const Joi = require('joi');
const { array } = require("joi");


exports.listCategories = (req, res) => {
    Model.Categories.findAll()
    .then(category => res.status(200).json(category))
    .catch(error => res.status(400).json(error))
}

exports.getCategoryById = (req,res) => {
    Model.Categories.findOne({
        where:{
            id_category : req.params.id
        }
    })
    .then((category) => {
        if (!category) {
            return res.status(400).json({
                message: 'Category does not exist',
            });
        }

        else {
            return res.status(200).json(category)
        }
    })
    .catch(error => res.json(error))
 
    
}

exports.listProductByCategory = (req,res) => {
    Model.Products.findAll({
        where: {
            fk_id_category:req.params.id
        }
    })
    .then(product => {

        if(product.length ==0){
            res.status(200).json({
                message:`Category with id ${req.params.id} does not have any product or does not exists`
            })
        }
        else {
              res.status(200).json(product)
        }
    })

    .catch(error => res.status(400).json(error))
    
}



exports.addCategory = (req,res) =>{
    const { label, image, description, fk_id_client} = req.body

    const list_fk_client = new Array()

    const postCategorySchema = Joi.object().keys({ 
        label : Joi.string().required(),
        image:Joi.string().required(),
        description:Joi.string().required(),
        fk_id_client:Joi.number().required()
    })

    const result = postCategorySchema.validate(req.body)

    const {error } = result;

    const valid = error == null;


    if (!valid) {
      res.status(400).json({ 
        message: 'Missing required parameters',
        info: 'Requires: label, image, description, fk_id_client' 
      })
    }

    else {

        Model.Client.findAll()
        .then(allClient => {
            Model.Client.count()
            .then(numberOfClient => {
                for(let i =0;i<numberOfClient;i++){
                    list_fk_client.push(allClient[i].id_client)
                }

                if(!list_fk_client.includes(fk_id_client)){
                    res.status(400).json({
                        message:"fk_id_client does not match any id_client"
                    })
                }

                else {
                    Model.Categories.create({
                    label : label,
                    image:image,
                    description:description,
                    fk_id_client:fk_id_client
                    })

                    .then(category => res.status(200).json(category)) 
                    .catch(error => res.status(400).json(error))
                }
            })
        })
        
    }
       
   
  
}


exports.editCategory =(req,res) => {

    const { label, image, description} = req.body

    Model.Categories.findOne({
        where: {
            id_category: req.params.id
        }
    })

    .then((category) => {
        if (!category) {
            return res.status(400).json({
                message: 'Category does not exist',
            });
        }

        const editCategorySchema = Joi.object().keys({ 
            label: Joi.string(),
            image: Joi.string(),
            description: Joi.string(), 
        })

        const result = editCategorySchema.validate(req.body)

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
            Model.Categories.update({
                label: label,
                image: image,
                description: description,
            },
            {
                where : {
                    id_category: req.params.id
                },
                returning:true,
              
            })
            .then(res.status(200).json({
                message:"Item has been updated"
            }))
            .catch(error => console.log(error))

            
        }
    })
    
    
}


exports.deleteCategory = (req,res) => {
    
    Model.Categories.findOne({
        where: {
            id_category: req.params.id
        }
    })
    .then((category) => {
        if (!category) {
            return res.status(400).json({
                message: 'Category does not exist',
            });
        }
    Model.Categories
            .destroy({
                where: {
                    id_category: req.params.id
                }
            })
            .then(res.status(400).json({
                message:`Category with id : ${req.params.id} has been deleted`
            })
        )}

    )
    .catch(error => res.status(400).json(error))
}