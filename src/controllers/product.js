const Model = require("../database/models");
const Joi = require('joi');

// const Model = {
//     Categories: require("../database/models/categories")(),           // config pour que l'ide propose les fonctions possibles
// }

exports.listProducts = (req, res) => {
    Model.Products.findAll()
    .then(product => res.status(200).json(product))
    .catch(error => res.status(400).json(error))
}

exports.getProductById = (req,res) => {
    Model.Products.findOne({
        where:{
            id_product : req.params.id
        }
    })
    .then((product) => {
        if (!product) {
            return res.status(400).json({
                message: 'Product does not exist',
            });
        }

        else {
            return res.status(200).json(product)
        }
    })
    .catch(error => res.json(error))
 
    
}



exports.addProduct = (req,res) =>{
    const {label, image, price, ubd, description, fk_id_category } = req.body

    const fk_category_list = new Array()

    const postProductSchema = Joi.object().keys({ 
        label : Joi.string().required(),
        image:Joi.string().required(),
        price:Joi.number().required(),
        ubd:Joi.string().required(),
        description:Joi.string().required(),
        fk_id_category:Joi.number().required()
    })

    const result = postProductSchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    if (!valid) {
      res.status(400).json({ 
        message: 'Missing required parameters or parameters type are incorrect',
        info: 'Requires: label, image, price, quantity, quantity_min, quantity_max, ubd, description, fk_id_category /n' 
      })
    }

    else {

        Model.Categories.findAll({
            attributes:["id_category"]
        })

        .then(allCategories => {
            Model.Categories.count()
            .then(numberOfCategories =>{
                for(let i=0;i<numberOfCategories;i++){
                    fk_category_list.push(allCategories[i].id_category)
                }

                if(!fk_category_list.includes(fk_id_category)){
                    return res.status(400).json({
                        message:"fk_id_category does not match any id_category"
                    })
                }

                else {
                    Model.Products.create({
                        label : label,
                        image:image,
                        price:price,
                        ubd:ubd,
                        description:description,
                        fk_id_category:fk_id_category
                    })
                
                    .then(product => res.status(200).json(product))

                }
            })
        })

    .catch(error => res.status(400).json(error))

    }
}

exports.editProduct =(req,res) => {

    const { label, image, price, ubd, description} = req.body

    Model.Products.findOne({
        where: {
            id_product: req.params.id
        }
    })

    .then((product) => {
        if (!product) {
            return res.status(400).json({
                message: 'Product does not exist',
            });
        }

        const editProductSchema = Joi.object().keys({ 
            label : Joi.string(),
            image:Joi.string(),
            price:Joi.number(),
            ubd:Joi.string(),
            description:Joi.string(),
        })

        const result = editProductSchema.validate(req.body)

        const {error } = result; 
        const valid = error == null; 
        if (!valid) { 
          res.status(400).json({ 
            message: 'One or more fields are not well written', 
          }) 
        } 
        
        else { 
            Model.Products.update({
                label : label,
                image:image,
                price:price,
                ubd:ubd,
                description:description,
            },
            {
                where : {
                    id_product: req.params.id
                }
            })
            .then(res.send("Modification apply"))
        }
    })
    
    .catch(error => console.log(error))

}


exports.deleteProduct = (req,res) => {
    
    Model.Products.findOne({
        where: {
            id_product: req.params.id
        }
    })
    .then((product) => {
        if (!product) {
            return res.status(400).json({
                message: 'Product does not exist',
            });
        }
    Model.Products
            .destroy({
                where: {
                    id_product: req.params.id
                }
            }).then(res.send(`Product with id : ${req.params.id} has been deleted`))
        }

    )
    .catch(error => res.status(400).json(error))
}
