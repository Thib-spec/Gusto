const Model = require("../database/models");
const Joi = require('joi');
const product = require("../database/models/product");

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
    const {label, image, price, quantity, quantity_min, quantity_max, ubd, description, fk_id_category } = req.body

    const postProductSchema = Joi.object().keys({ 
        label : Joi.string().required(),
        image:Joi.string().required(),
        price:Joi.number().required(),
        quantity:Joi.number().required(),
        quantity_min:Joi.number().required(),
        quantity_max:Joi.number().required(),
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
        
        Model.Products.create({
        label : label,
        image:image,
        price:price,
        quantity:quantity,
        quantity_min:quantity_min,
        quantity_max:quantity_max,
        ubd:ubd,
        description:description,
        fk_id_category:fk_id_category
    })

    .then(product => res.status(200).json(product))
    .catch(error => res.status(400).json(error))

    }

        
}

exports.editProduct =(req,res) => {

    const { label, image, price, quantity, quantity_min, quantity_max, ubd, description, fk_id_category} = req.body

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
            quantity:Joi.number(),
            quantity_min:Joi.number(),
            quantity_max:Joi.number(),
            ubd:Joi.string(),
            description:Joi.string(),
            fk_id_category:Joi.number()
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
                quantity:quantity,
                quantity_min:quantity_min,
                quantity_max:quantity_max,
                ubd:ubd,
                description:description,
                fk_id_category:fk_id_category
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
