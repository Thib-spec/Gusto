const Model = require("../database/models");
const Joi = require('joi');



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
    const { label, image, description} = req.body

    const postCategorySchema = Joi.object().keys({ 
        label : Joi.string().required(),
        image:Joi.string().required(),
        description:Joi.string().required()
    })

    const result = postCategorySchema.validate(req.body)

    const {error } = result;

    const valid = error == null;


    if (!valid) {
      res.status(400).json({ 
        message: 'Missing required parameters',
        info: 'Requires: label, image, description' 
      })
    }

    else {
        
        Model.Categories.create({
        label : label,
        image:image,
        description:description
    })

    .then(category => res.status(200).json(category))
    .catch(error => res.status(400).json(error))

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
        
        else { 
            Model.Categories.update({
                label: label,
                image: image,
                description: description,
            },
            {
                where : {
                    id_category: req.params.id
                }
            })
            .then(res.send("Modification apply"))
        }
    })
    
    .catch(error => console.log(error))

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
            }).then(res.send(`Category with id : ${req.params.id} has been deleted`))
        }

    )
    .catch(error => res.status(400).json(error))
}
