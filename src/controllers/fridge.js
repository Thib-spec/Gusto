const Model = require("../database/models");
const Joi = require('joi');

const { Op } = require("sequelize");

exports.listFridges = (req, res) => {
    Model.Fridges.findAll({
        include:{all:true}
    })
    .then(fridge => res.status(200).json(fridge))
    .catch(error => res.status(400).json(error))
}

exports.getFridgeNationality = (req,res) =>{
    Model.Fridges.findOne({
        where:{
            id_fridge:req.params.id
        },
        include:{model:Model.Nationalities}
    })

    .then((fridge) => {
        if (!fridge) {
            return res.status(400).json({
                message: 'Fridge not found',
            });
        }

        else {
            res.status(200).json(fridge)
        }
    })
    .catch(error => res.status(400).json(error))
}



exports.listProductByFridge = (req,res) =>{
    Model.Fridges.findOne({
        where:{
            id_fridge:req.params.id
        },
        include:[{
            model:Model.Products,
        }]
})
    
    .then(fridge =>{
        if (!fridge) {
            return res.status(400).json({
                message: 'Fridge does not exist',
            });
        }

        else {
            return res.status(200).json(fridge)
        }
        
        
    })
    .catch(error => res.status(400).json(error))

}


   
    

exports.listClientByFridge = (req,res) => {
    Model.Fridges.findOne({
        where:{
            id_fridge : req.params.id
        },
    })

    .then(fridge =>{
        if (!fridge) {
            return res.status(400).json(error)({
                message: 'Fridge does not exist',
            });
        }

        else {
            fridge.getClients()
            .then(clients =>{
                if(clients.length == 0){
                    return res.status(400).json({
                        message:`Fridge with id ${req.params.id} does not have any client`
                    })
                }

                else {
                    res.status(200).json(clients)
                }
            })
            .catch(error => res.status(400).json(error))
        }
    })
    .catch(error => res.status(400).json(error))
}
    
    


exports.listBadgeByFridge = (req,res) => {
    Model.Fridges.findOne({
        where:{
            id_fridge : req.params.id
        },
    })

    .then(fridge =>{
        if (!fridge) {
            return res.status(400).json({
                message: 'Fridge does not exist',
            });
        }

        else {
            fridge.getBadges()
    
            .then(badges =>{
                if(badges.length == 0){
                    return res.status(400).json({
                        message:`Fridge with id ${req.params.id} does not have any badge`
                    })
                }

                else {
                    res.status(200).json(badges)
                }
            })
            .catch(error => res.status(400).json(error))
        }
    })
    .catch(error => res.status(400).json(error))
}



exports.listMenuByFridge = (req,res) => {
    Model.Fridges.findOne({
        where:{
            id_fridge : req.params.id
        },
    })

    .then(fridge =>{
        if (!fridge) {
            res.status(400).json({
                message: 'Fridge does not exist',
            });
        }

        else {
            fridge.getMenus()  
            .then(menus =>{
                if(menus.length == 0){
                    return res.status(400).json({
                        message:`Fridge with id ${req.params.id} does not have any menu`
                    })
                }

                else {
                    res.status(200).json(menus)
                }
            })
            .catch(error => res.status(400).json(error))
        }
    })
    .catch(error => res.status(400).json(error))
}


exports.listProductByOrderByFridge = (req,res) => {
    let fk_list = new Array()

    Model.Orders.findAll()
    .then(allOrders => {
        Model.Orders.count()
        .then(numberOfOrder =>{
            for(let i=0;i<numberOfOrder;i++){
                fk_list.push(allOrders[i].fk_id_fridge)
            }

            Model.Orders.findAll({
                where:{
                    fk_id_fridge: req.params.id
                },
                include:{ model: Model.Products}
            })
        
            .then(orders => {
                if(!fk_list.includes(Number(req.params.id))){
                 
                    return res.status(400).json({
                        message: "Fridge does not exist or does not have any order"
                    })
                }
        
                else {
                    
                    return res.json(orders)
                }
            })
            .catch(error => res.json(error))


        })
        .catch(error => res.json(error))
    })
    .catch(error => res.json(error))
}


exports.listProductsBySaleByFridge = (req,res) => {
    let sale_id_list = new Array()

    Model.Sales.findAll()
    .then(allSales => {
        Model.Sales.count()
        .then(numberOfSale =>{
            for(let i=0;i<numberOfSale;i++){
                sale_id_list.push(allSales[i].id_sale)
            }

            Model.Fridges.findOne({
                where:{
                    id_fridge: req.params.id
                }
            })

            .then(fridge => {
                if (!fridge) {
                    return res.status(400).json({
                        message: 'Fridge does not exist',
                    });
                }
                else {

                    Model.Sales.findAll({
                        where:{
                            fk_id_fridge:fridge.id_fridge      
                        },
                        include:{model:Model.Products},
                        order:[
                            ["updatedAt",'DESC']
                        ]
                    })
    
                    .then(sales =>{
                        if(!sale_id_list.includes(Number(req.params.id))){
                            return res.status(400).json({
                                message:"Fridge does not have any sale"
                            })
                        }
        
                        else {
                            res.status(200).json(sales.slice(0,5))
                        }
                    })
                }
            })
            
        })
    })

    .catch(error => res.json(error))       
}





exports.AddProductQuantity = (req,res) => {

    const {fk_id_product, quantity} = req.body

    const list_fk_product = new Array()

    const postQuantitySchema = Joi.object().keys({ 
        quantity : Joi.number().required(),
        fk_id_product: Joi.number().required()
    })

    const result = postQuantitySchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    if (!valid) {
        res.status(400).json({ 
          message: 'Missing required parameters',
          info: 'Requires: quantity, fk_id_product' 
        })
      }

    else {

        Model.Products.findAll()
        .then(allProduct => {
            Model.Products.count()
            .then(numberOfProduct => {
                for(let i = 0; i<numberOfProduct;i++){
                    list_fk_product.push(allProduct[i].id_product)
                }

                Model.Fridges.findOne({
                    where:{
                        id_fridge:req.params.id
                    }
                })
            
                .then((fridge) => {
                    if (!fridge) {
                        return res.status(400).json({
                            message: 'Fridge does not exist',
                        });
                    }

                    else if (!list_fk_product.includes(fk_id_product)){
                        res.status(400).json({
                            message: "fk_id_product does not match any id_product"
                        })
                    }
            
                    else {
                        Model.fridges_products.create({
                            fk_id_product:fk_id_product,
                            fk_id_fridge:req.params.id,
                            quantity:quantity
                        })
            
                        .then(fridge_product => res.status(200).json(fridge_product))
                        
                    }
                })
            })
        })
    }
}


exports.EditProductQuantity = (req,res) => {

    const {quantity} = req.body
    const fk_list_product = new Array()

    const editQuantitySchema = Joi.object().keys({ 
        quantity : Joi.number(),
    })

    const result = editQuantitySchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    if (!valid) {
        res.status(400).json({ 
          message: 'Field is not well written',
        })
      }

    else {
        Model.Products.findAll()
        .then(allProducts => {
            Model.Products.count()
            .then(numberOfProduct => {
                for(let i=0;i<numberOfProduct;i++){
                    fk_list_product.push(allProducts[i].id_product)
                }
                Model.Fridges.findOne({
                    where:{
                        id_fridge:req.params.id
                    }
                })

                .then((fridge) => {
                    if (!fridge) {
                        return res.status(400).json({
                            message: 'Fridge does not exist',
                        });
                    }

                    else if (!fk_list_product.includes(Number(req.params.productId))){
                        res.status(400).json({
                            message:"fk_id_product does not match any id_product"
                        })

                    }

                    else if(Object.keys(req.body).length == 0){
                        res.status(400).json({
                            message:"No parameters were passed"
                        })
                    }

                    else {

                        Model.fridges_products.findOne({
                            where:{
                                [Op.and]: [
                                    { fk_id_fridge:req.params.id },
                                    { fk_id_product: req.params.productId }
                                ]
                            }
                        })
                        .then(result =>{
                            if(!result){
                                res.status(400).json({
                                    message:`Fridge ${req.params.id} does not contain product ${req.params.productId}`
                                })
                            }

                            else {
                                Model.fridges_products.update({
                                    quantity:quantity
                                },
                                {
                                    where:{
                                        [Op.and]: [
                                            { fk_id_fridge:req.params.id },
                                            { fk_id_product: req.params.productId }
                                        ]
                                    }
                                })
        
                                .then(res.status(200).json("Item has been updated"))
                                .catch(error => res.status(400).json(error))
                            }
                        })
                   }
                })
            })
        }) 
        
        .catch(error => res.status(400).json(error))
    }

}



exports.RemoveProductQuantity = (req,res) => {
    const list_fk_product = new Array()

    Model.Products.findAll()
    .then(allProducts =>{
        Model.Products.count()
        .then(numberOfProduct => {
            for(let i = 0;i<numberOfProduct;i++){
                list_fk_product.push(allProducts[i].id_product)
            }
            
            Model.Fridges.findOne({
                where:{
                    id_fridge:req.params.id
                }
            })

            .then((fridge) => {
                if (!fridge) {
                    return res.status(400).json({
                        message: 'Fridge does not exist',
                    });
                }

                else if (!list_fk_product.includes(Number(req.params.productId))){
                    res.status(400).json({
                        message:"fk_id_product does not match any id_product"
                    })

                }

                else {

                    Model.fridges_products.findOne({
                        where:{
                            [Op.and]: [
                                { fk_id_fridge:req.params.id },
                                { fk_id_product: req.params.productId }
                            ]
                        }
                    })
                    .then(result =>{
                        if(!result){
                            res.status(400).json({
                                message:`Fridge ${req.params.id} does not contain product ${req.params.productId}`
                            })
                        }
                        else {
                            Model.fridges_products.destroy({
                                where:{
                                    [Op.and]: [
                                        { fk_id_fridge:req.params.id },
                                        { fk_id_product: req.params.productId }
                                    ]
                                }
                            })

                            .then(res.status(200).json({
                                message: "Deletion completed"})
                            )
                            .catch(error =>res.status(400).json(error))

                        }
                    })
                }
            })
        })    
    })
}



exports.getFridgeById = (req,res) => {
    Model.Fridges.findOne({
        where:{
            id_fridge : req.params.id
        },
        include:{all:true}
    })
    .then((fridge) => {
        if (!fridge) {
            return res.status(400).json({
                message: 'Fridge does not exist',
            });
        }

        else {
            return res.status(200).json(fridge)
        }
    })
    .catch(error => res.json(error))
  
}


exports.addFridge = (req,res) =>{
    const { label, fk_id_technologies, fk_id_fridgePreset} = req.body

    const fk_tech_list = new Array()
    const fk_fridgePresetList = new Array()

    const postFridgeSchema = Joi.object().keys({ 
        label : Joi.string().required(),
        fk_id_technologies:Joi.number().required(),
        fk_id_fridgePreset: Joi.number().required()
    })

    const result = postFridgeSchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    if (!valid) {
      res.status(400).json({ 
        message: 'Missing required parameters',
        info: 'Requires: label, fk_id_technologies, fk_id_fridgePreset' 
      })
    }
    else {

        Model.Technologies.findAll()
        .then(allTechs =>{
            Model.Technologies.count()
            .then(numberofTech =>{
                for(let i=0;i<numberofTech;i++){
                    fk_tech_list.push(allTechs[i].id_technologies)
                }

                Model.FridgePresets.findAll()
                .then(allPreset =>{
                    Model.FridgePresets.count()
                    .then(numberofPreset =>{
                        for(let i=0;i<numberofPreset;i++){
                            fk_fridgePresetList.push(allPreset[i].id_fridgePresets)
                        }

                        if(!fk_tech_list.includes(fk_id_technologies)){
                            return res.status(400).json({
                                message:"fk_id_technologies does not match any id_technologies"
                            })
                        }

                        else if(!fk_fridgePresetList.includes(fk_id_fridgePreset)){
                            res.status(400).json({
                                message:"fk_id_fridgePreset does not match any id_fridgePresets"
                            })
                        }

                        else {
                            Model.Fridges.create({
                                label : label,
                                fk_id_technologies:fk_id_technologies,
                                fk_id_fridgePreset:fk_id_fridgePreset
                            })
                            .then(fridge => res.status(200).json(fridge))
                            .catch(error => res.status(400).json(error))
            
                        }
                    })
                })             
            })
        })
        .catch(error => res.status(400).json(error))
    }
        
}


exports.editFridge =(req,res) => {

    const { label, fk_id_technologies} = req.body

    Model.Fridges.findOne({
        where: {
            id_fridge: req.params.id
        }
    })

    .then((fridge) => {
        if (!fridge) {
            return res.status(400).json({
                message: 'Fridge does not exist',
            });
        }

        const editFridgeSchema = Joi.object().keys({ 
            label: Joi.string(),
            fk_id_technologies: Joi.number()
        })

        const result = editFridgeSchema.validate(req.body)

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
            Model.Fridges.update({
                label: label,
                fk_id_technologies: fk_id_technologies,
            },
            {
                where : {
                    id_fridge: req.params.id
                }
            })
            .then(res.status(200).json({
                message:"Item has been updated"})
            )
            .catch(error => res.status(400).json(error))

        }
    })
    
    .catch(error => res.status(400).json(error))

}


exports.deleteFridge = (req,res) => {
    
    Model.Fridges.findOne({
        where: {
            id_fridge: req.params.id
        }
    })
    .then((fridge) => {
        if (!fridge) {
            return res.status(400).json({
                message: 'Fridge does not exist',
            });
        }
    Model.Fridges
            .destroy({
                where: {
                    id_fridge: req.params.id
                }
            }).then(res.status(200).json({
                message:`Fridge with id : ${req.params.id} has been deleted`})
            )
        }

    )
    .catch(error => res.status(400).json(error))
}


exports.addNationalitytoFridge = (req,res) =>{
    const {fk_id_nationality} = req.body

    const list_fk_nationalities = new Array()
    const postLanguagetoFridgeSchema = Joi.object().keys({ 
        fk_id_nationality : Joi.number().required()
    })

    const result = postLanguagetoFridgeSchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    if (!valid) {
      res.status(400).json({ 
        message: 'Missing required parameters',
        info: 'Requires: fk_id_nationality' 
      })
    }
    else {

            Model.Nationalities.findAll()
            .then(allNationalities =>{
                Model.Nationalities.count()
                .then(numberofNationalities =>{
                    for(let i=0;i<numberofNationalities;i++){
                        list_fk_nationalities.push(allNationalities[i].id_nationality)
                    }
                    console.log(list_fk_nationalities)
                    console.log(fk_id_nationality)

                    if(!list_fk_nationalities.includes(fk_id_nationality)){
                        return res.status(400).json({
                            message:"fk_nationalities does not match any id_nationality"
                        })
                    }

                    else {
                        Model.Fridges.findOne({
                            where:{
                                id_fridge: req.params.id
                            }
                        })
                        .then(fridge => {
                            if(!fridge){
                                return res.status(400).json({
                                    message: 'Fridge does not exist'
                                })
                            }
                            else{
                                fridge.addNationalities(fk_id_nationality)
                                .then(addedFridge => res.status(200).json(addedFridge))
                            }
                        })
                        .catch(error => res.status(400).json(error))
        
                    }
                })
            })             
            .catch(error => res.status(400).json(error))
    }
}


exports.addBadgetoFridge = (req,res) =>{
    const {fk_id_badge} = req.body

    const list_fk_badges = new Array()
    const postBadgetoFridgeSchema = Joi.object().keys({ 
        fk_id_badge : Joi.number().required()
    })

    const result = postBadgetoFridgeSchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    if (!valid) {
      res.status(400).json({ 
        message: 'Missing required parameters',
        info: 'Requires: fk_id_badge' 
      })
    }
    else {

            Model.Badges.findAll()
            .then(allBadges =>{
                Model.Badges.count()
                .then(numberofBadges =>{
                    for(let i=0;i<numberofBadges;i++){
                        list_fk_badges.push(allBadges[i].id_badge)
                    }

                    if(!list_fk_badges.includes(fk_id_badge)){
                        return res.status(400).json({
                            message:"fk_badges does not match any id_badge"
                        })
                    }

                    else {
                        Model.Badges.findOne({
                            where:{
                                id_badge: req.params.id
                            }
                        })
                        .then(badge => {
                            if(!badge){
                                return res.status(400).json({
                                    message: 'Fridge does not exist'
                                })
                            }
                            else{
                                fridge.addBadges(fk_id_badge)
                                .then(addedBadge => res.status(200).json(addedBadge))
                            }
                        })
                        .catch(error => res.status(400).json(error))
        
                    }
                })
            })             
            .catch(error => res.status(400).json(error))
    }
}
