const Model = require("../database/models");
const Joi = require('joi');

    exports.listMenus = (req, res) => {
        Model.Menus.findAll()
        .then(menu => res.status(200).json(menu))
        .catch(error => res.status(400).json(error))
    }

    exports.getMenuForUser = (req,res) => {
        Model.Menus.findAll({
            where:{
                fk_id_client: req.user.fk_id_client
            }
        })
        .then(userMenus => res.status(200).json(userMenus))
        .catch(error => res.status(400).json(error))
    }


    exports.getMenuById = (req,res) => {
        Model.Menus.findOne({
            where:{
                id_menu : req.params.id
            }
        })
        .then((menu) => {
            if (!menu) {
                return res.status(400).json({
                    message: 'Menu not found',
                });
            }

            else {
                return res.status(200).json(menu)
            }
        })
        .catch(error => res.status(400).json(error))
     
        
    }

    exports.listProductByMenu = (req, res) => {
        Model.Menus.findOne({
            where:{
                id_menu : req.params.id
            }
        })
        .then((menu) => {
            if (!menu) {
                return res.status(400).json({
                    message: 'Menu does not exist',
                });
            }
    
            else {
                menu.getProducts()
                .then(products =>{
            
                    if(products.length == 0){
                        return res.status(400).json({
                            message:`Menu with id ${req.params.id} does not have any product`
                        })
                    }
                    
                    else {
                        return res.status(200).json(products)
                    }
                })
            }
        })
        .catch(error => res.json(error))
    }


    exports.listProductsByMenusForUser = (req,res) => {

        let menu_ids = []
        Model.Menus.findAll({
            where:{
                fk_id_client:req.user.fk_id_client
            },
        })
        .then(userMenus => {
            for(let i =0;i<userMenus.length;i++){
                menu_ids.push(userMenus[i].id_menu)
            }
            if(!menu_ids.includes(Number(req.params.id))){
                res.status(400).json({
                    message: `You are not all allowed to see content of menu ${req.params.id}`
                })
            }
            else {
                Model.Menus.findOne({
                    where:{
                        id_menu : req.params.id
                    }
                })
                .then((menu) => {
                    if (!menu) {
                        return res.status(400).json({
                            message: 'Menu does not exist',
                        });
                    }
            
                    else {
                        menu.getProducts()
                        .then(products =>{
                    
                            if(products.length == 0){
                                return res.status(400).json({
                                    message:`Menu with id ${req.params.id} does not have any product`
                                })
                            }
                            
                            else {
                                return res.status(200).json(products)
                            }
                        })
                    }
                })
                .catch(error => res.json(error))
            }
        })
    }


    exports.addProductInMenu = (req,res) => {

        let list_product = []
        let list_productOfMenu = []


        const arraySchema = Joi.array().items(
            Joi.object({
                fk_id_product: Joi.number().required(),
            })
        )

        const result = arraySchema.validate(req.body)

        const {error } = result;

        const valid = error == null;

        Model.Products.findAll()
        .then(allProducts => {
            Model.Products.count()
            .then(numberOfProduct => {
                for(let i =0;i<numberOfProduct;i++){
                    list_product.push(allProducts[i].id_product)
                }

                Model.Menus.findOne({
                    where:{
                        id_menu:req.params.id
                    }
                })
        
                .then((menu) => {
                    if (!menu) {
                        return res.status(400).json({
                            message: 'Menu does not exist',
                        });
                    }
        
                    else {
        
                        if (req.body instanceof Array){
        
                            if(Object.keys(req.body).length == 1){
            
                                if(!list_product.includes(req.body[0].fk_id_product)){
                                    return res.status(400).json({
                                        message:"fk_id_product does not match any id_product"
                                    })
                                }

                                else if(!valid){
                                    return res.status(400).json({
                                        message: "Please review type and value of input parameters"
                                    })
                                }
                                
                                else {

                                    menu.getProducts()
                                    .then(allProd=>{
                                        for(let i =0;i<allProd.length;i++){
                                            list_productOfMenu.push(allProd[i].menus_products.fk_id_product)
                                        }
                                    
                                        if(list_productOfMenu.includes(req.body[0].fk_id_product)){
                                            res.status(400).json({
                                                message:`Menu ${req.params.id} already contains product ${req.body[0].fk_id_product}`
                                            })
                                        }

                                        else if(!valid){
                                            return res.status(400).json({
                                                message: "Please review type and value of input parameters"
                                            })
                                        }

                                        else {
                                            menu.addProducts((req.body[0].fk_id_product))
                                            res.status(200).json({
                                                message:"Product has been added"
                                            })
                                        }
                                    })
                                    
                                }
                                    
        
                            }
        
                            else {
                                for(let i=0;i<req.body.length;i++){
                                
                                    if(!list_product.includes(req.body[i].fk_id_product)){
                                        return res.status(400).json({
                                            message:"fk_id_product does not match any id_product"
                                        })
                                    }
        
                                    else {
                                        menu.addProducts(req.body[i].fk_id_product)
                                    }
                                }
                            
                                res.status(200).json({
                                    message:"Products have been added"
                                })
                                
                            }
                        }
                    }
                })

            })
        })

    }

    // verif si produit appartient au menu pas possible
    exports.deleteProductInMenu = (req,res) => {
       
        let list_product = []

        const arraySchema = Joi.array().items(
            Joi.object({
                fk_id_product: Joi.number().required(),
            })
        )

        const result = arraySchema.validate(req.body)

        const {error } = result;

        const valid = error == null;


        Model.Products.findAll()
        .then(allProducts => {
            Model.Products.count()
            .then(numberOfProduct => {
                for(let i =0;i<numberOfProduct;i++){
                    list_product.push(allProducts[i].id_product)
                }

                Model.Menus.findOne({
                    where:{
                        id_menu:req.params.id
                    }
                })
    
                .then((menu) => {
                    if (!menu) {
                        return res.status(400).json({
                            message: 'Menu does not exist',
                        });
                    }
    
                    else {
    
                        if (req.body instanceof Array){
            
                            if(Object.keys(req.body).length == 1){

                                if(!valid){
                                    return res.status(400).json({
                                        message: "Please review type and value of input parameters"
                                    })
                                }

                                else {
                                    menu.removeProducts(req.body[0].fk_id_product)
        
                                    res.status(200).json({
                                        message:"Product has been deleted"
                                    })

                                }
                            }
        
                            else {

                                if(!valid){
                                    return res.status(400).json({
                                        message: "Please review type and value of input parameters"
                                    })
                                }
                                else {
                                    for(let i=0;i<req.body.length;i++){

                                        menu.removeProducts(req.body[i].fk_id_product)             
                                    }
                            
                                    res.status(200).json({
                                        message:"Products have been deleted"
                                    })
                                }  
                                
                            }
                        }
                    }
                })
            })
        })
    }

    exports.addMenu = (req,res) =>{
        const { image, price, web_label, fridge_label} = req.body;
        

       const postMenuSchema = Joi.object().keys({ 
        price: Joi.number().max(32767).required(),
        web_label: Joi.string().required(),
        fridge_label:Joi.string().required(),
    })

    const result = postMenuSchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    if (!valid) {
      res.status(400).json({ 
        message: 'Please review required parameters and their value',
        info: 'Requires: price, web_label, fridge_label' 
      })
    }

   

    else {

        Model.Client.findOne({
            where:{
                id_client: req.user.fk_id_client
            }
        })
        .then(client => {
            Model.Menus.create({ 
                image:image,
                price:price,
                web_label:web_label,
                fridge_label:fridge_label,
                fk_id_client:client.id_client
            }) 
            .then(menu => res.status(200).json(menu))
            .catch(error => res.status(400).json(error))

        })
                
    }
}



exports.editMenu = (req,res) => {
    const { image, price, web_label, fridge_label} = req.body;

    Model.Menus.findOne({
        where: {
            id_menu: req.params.id
        }
    })

    .then((menu) => {
        if (!menu) {
            return res.status(400).json({
                message: 'Menu not found',
            });
        }

        const editMenuSchema = Joi.object().keys({ 
            image: Joi.string(),
            price: Joi.number().max(32767),
            web_label: Joi.string(), 
            fridge_label:Joi.string(),
        })

        const result = editMenuSchema.validate(req.body)

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
            Model.Menus.update({
                image: image,
                price: price,
                web_label: web_label,
                fridge_label:fridge_label
            },
            {
                where : {
                    id_menu: req.params.id
                }
            })

            return res.status(200).json({
                message: "Item has been updated"
            })
        }
    })
    
    .catch(error => console.log(error))
}
        

exports.deleteMenu = (req,res) => {
    
    Model.Menus.findOne({
        where: {
            id_menu: req.params.id
        }
    })
    .then((menu) => {
        if (!menu) {
            return res.status(400).json({
                message: 'Menu not found',
            });
        }
        else {

            Model.Menus.destroy({
                where: {
                    id_menu: req.params.id
                }
            })
            .then(res.status(200).json({
                message:`Menu with id : ${req.params.id} has been deleted`})
            )
        }
            
    })
    .catch(error => res.status(400).json(error))
}

