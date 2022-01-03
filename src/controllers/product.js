const Model = require("../database/models");
const Joi = require('joi');

// Retourne l'ensemble des produits

exports.listProducts = (req, res) => {
    Model.Products.findAll()
    .then(product => res.status(200).json(product))
    .catch(error => res.status(400).json(error))
}

// Retourne l'ensemble des produits associés à l'utilisateur connecté

exports.listProductForUser = (req,res) => {

    let listUserProduct = []
    Model.Products.findAll({
        include:{model:Model.Categories}
    })
    .then(products => {
        for(let i=0;i<products.length;i++){
            if(products[i].Category.fk_id_client == req.user.fk_id_client) {
                listUserProduct.push(products[i])
            }
        }

        res.status(200).json(listUserProduct)
    })

    .catch(error => res.status(400).json(error))
 
}

// Récupère un produit par son id

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


// Ajout d'un produit

exports.addProduct = (req,res) =>{
    const {label, image, price, ubd, description, fk_id_category } = req.body

    let fk_category_list = []
    let prodLabel = []

    const postProductSchema = Joi.object().keys({ 
        label : Joi.string().required(),
        image:Joi.string(),
        price:Joi.number().max(32767).required(),
        ubd:Joi.number().max(127),
        description:Joi.string(),
        fk_id_category:Joi.number().required()
    })

    const result = postProductSchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    if (!valid) {
      res.status(400).json({ 
        message: 'Please review required parameters and their value',
        info: 'Requires: label, price, fk_id_category' 
      })
    }

    else {
        Model.Categories.findAll()

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

                    Model.Products.findAll()
                    .then(allproducts => {
                        Model.Products.count()
                        .then(numberOfProduct => {
                            for(let i =0;i<numberOfProduct;i++){
                                prodLabel.push(allproducts[i].label.toLowerCase())
                            }

                            if(prodLabel.includes(label.toLowerCase())){
                                res.status(400).json({
                                    message: "This label alredy exists"
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
                                .catch(error => res.status(400).json(error))

                            }
                        })
                    })
                   
                }
            })
        })
    }
}

// Modifie un produit

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
            price:Joi.number().max(32767),
            ubd:Joi.number().max(127),
            description:Joi.string()
        })

        const result = editProductSchema.validate(req.body)

        const {error } = result; 
        const valid = error == null;

        if (!valid) { 
          res.status(400).json({ 
            message: 'Please review type and value of input parameters', 
          }) 
        }

        else if(Object.keys(req.body).length == 0){
            res.status(400).json({
                message:"No parameters were passed"
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
            .then(res.status(200).json({
                message: "Item has been updated"})
            )  
            .catch(error => res.status(400).json(error))
        }
    })
}

// Supprime un produit

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

        else {
            Model.Products.destroy({
                where: {
                    id_product: req.params.id
                }
            })
            .then(res.status(200).json({
                message:`Product with id : ${req.params.id} has been deleted`})
            )
            .catch(error => res.status(400).json(error))
        }
    })
    
}
