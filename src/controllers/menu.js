const Model = require("../database/models");
const Joi = require('joi');

// const Model = {
//     Users: require("../database/models/users")(),           // config pour que l'ide propose les fonctions possibles
// }

    exports.listMenus = (req, res) => {
        Model.Menus.findAll()
        .then(menu => res.status(200).json(menu))
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


    exports.addProductInMenu = (req,res) => {
        const {fk_id_product} = req.body


        const postProductInMenuSchema = Joi.object().keys({ 
            fk_id_product: Joi.number().required()
        })

        const result = postProductInMenuSchema.validate(req.body)

        const {error } = result;

        const valid = error == null;

        if (!valid) {
            res.status(400).json({ 
            message: 'Missing required parameters',
            info: 'Requires: fk_id_product' 
            })
        }

        else {
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
                    menu.addProducts(fk_id_product)

                    .then(addedProduct => res.status(200).json(addedProduct))
                    
                }
            })
        }
    }


    exports.deleteProductInMenu = (req,res) => {
        const {fk_id_product} = req.body


        const postProductInMenuSchema = Joi.object().keys({ 
            fk_id_product: Joi.number().required()
        })

        const result = postProductInMenuSchema.validate(req.body)

        const {error } = result;

        const valid = error == null;

        if (!valid) {
            res.status(400).json({ 
            message: 'Missing required parameters',
            info: 'Requires: fk_id_product' 
            })
        }

        else {
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
                    menu.removeProducts(fk_id_product)

                    .then(res.status(200).json("Deletion completed"))
                    
                }
            })
        }
    }

    exports.addMenu = (req,res) =>{
        const { image, price, web_label, fridge_label, fk_id_client } = req.body;
        const fk_client_list = new Array()

       const postMenuSchema = Joi.object().keys({ 
        image: Joi.string().required(),
        price: Joi.number().required(),
        web_label: Joi.string().required(),
        fridge_label:Joi.string().required(),
        fk_id_client:Joi.number().required()
    })

    const result = postMenuSchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    if (!valid) {
      res.status(400).json({ 
        message: 'Missing required parameters',
        info: 'Requires: image, price, web_mabel, fk_id_client' 
      })
    }

   

    else {

        Model.Client.findAll({
            attributes:["id_client"]
        })
        .then(client => {
            Model.Client.count()
            .then(numberOfClient => {
                for(let i = 0;i<numberOfClient;i++){
                    fk_client_list.push(client[i].id_client)
                }
                

                if(!fk_client_list.includes(fk_id_client)){
                    res.status(400).json({
                        message: `fk_id_client does not match any id_client`
                    })
                }
        
                else {
                
               Model.Menus.create({ 
                image:image,
                price:price,
                web_label:web_label,
                fridge_label:fridge_label,
                fk_id_client:fk_id_client
            })
            
            .then(menu => res.status(200).json(menu))

            }})
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
            price: Joi.number(),
            web_label: Joi.string(), 
            fridge_label:Joi.string(),
            user_language:Joi.string()
        })

        const result = editMenuSchema.validate(req.body)

        const {error } = result; 
        const valid = error == null; 
        if (!valid) { 
          res.status(400).json({ 
            message: 'One or more fields are not well written', 
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
            return res.send("Modification apply")
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
            Model.Menus
                    .destroy({
                        where: {
                            id_menu: req.params.id
                        }
                    }).then(() => res.send(`Menu with id : ${req.params.id} has been deleted`))
                }

            )
            .catch(error => res.status(400).json(error))
        }

