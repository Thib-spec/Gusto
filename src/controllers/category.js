const Model = require("../database/models");
const Joi = require('joi');


exports.listCategories = (req, res) => {
    Model.Categories.findAll()
    .then(category => res.status(200).json(category))
    .catch(error => res.status(400).json(error))
}


exports.getCategoryForUser = (req,res) => {
    Model.Categories.findAll({
        where:{
            fk_id_client: req.user.fk_id_client
        }
    })
    .then(categories =>res.json(categories))
    
   
    
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
    .catch(error => res.status(400).json(error))
 
    
}


exports.listProductByCategory = (req,res) => {
    Model.Products.findAll({
        where: {
            fk_id_category:req.params.id
        }
    })
    .then(product => {

        if(product.length ==0){
            res.status(400).json({
                message:`Category with id ${req.params.id} does not have any product or does not exists`
            })
        }
        else {
              res.status(200).json(product)
        }
    })

    .catch(error => res.status(400).json(error))
    
}


exports.listProductsByCategoryForUser = (req,res) => {

    let category_ids = []
    Model.Categories.findAll({
        where:{
            fk_id_client:req.user.fk_id_client
        },
    })
    .then(userCategories => {
        for(let i =0;i<userCategories.length;i++){
            category_ids.push(userCategories[i].id_category)
        }
        if(!category_ids.includes(Number(req.params.id))){
            res.status(400).json({
                message: `You are not all allowed to see content of category ${req.params.id}`
            })
        }
        else {
            Model.Products.findAll({
                where: {
                    fk_id_category:req.params.id
                }
            })
            .then(product => {
        
                if(product.length ==0){
                    res.status(400).json({
                        message:`Category with id ${req.params.id} does not have any product or does not exists`
                    })
                }
                else {
                    res.status(200).json(product)
                }
            })
        
            .catch(error => res.status(400).json(error))
        }
    })
}



exports.addCategory = (req,res) =>{
    const { label, image, description} = req.body


    let list_label = []

    const postCategorySchema = Joi.object().keys({ 
        label : Joi.string().required(),
        image:Joi.string(),
        description:Joi.string(),
    })

    const result = postCategorySchema.validate(req.body)

    const {error } = result;

    const valid = error == null;


    if (!valid) {
      res.status(400).json({ 
        message: 'Missing required parameters',
        info: 'Requires: label' 
      })
    }

    else {

        Model.Categories.findAll()
        .then(allCategories => {
            Model.Categories.count()
            .then(numberOfCategories => {
                for (let i=0;i<numberOfCategories;i++){
                    list_label.push(allCategories[i].label)
                }

                if(list_label.includes(label)){
                    res.status(400).json({
                        message:"Category with this label already exists"
                    })
                }

                else {

                    Model.Client.findOne({
                        where:{
                            id_client:req.user.fk_id_client
                        }
                    })
                    .then(client => {
                        Model.Categories.create({
                        label : label,
                        image:image,
                        description:description,
                        fk_id_client:client.id_client
                    })

                    .then(category => res.status(200).json(category)) 
                    .catch(error => res.status(400).json(error))
                    })
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

              
            })
            .then(res.status(200).json({
                message:"Item has been updated"
            }))
            .catch(error => console.log(error))

            
        }
    })
    
    .catch(error => res.status(400).json(error))

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
            .then(res.status(200).json({
                message:`Category with id : ${req.params.id} has been deleted`
            })
        )}

    )
    .catch(error => res.status(400).json(error))
}