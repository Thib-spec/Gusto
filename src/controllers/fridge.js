const Model = require("../database/models");
const Joi = require('joi');

const { Op } = require("sequelize");
const { number } = require("joi");

exports.listFridges = (req, res) => {
    Model.Fridges.findAll({
        include:{all:true}
    })
    .then(fridge => res.status(200).json(fridge))
    .catch(error => res.status(400).json(error))
}



exports.getFridgeForUser = (req,res) => {

    const result = new Array()


    Model.Fridges.findAll({
        include:{all:true}
    })
    .then(fridges => {
        for(let i =0;i<fridges.length;i++){
     
            if((fridges[i].Clients).length > 0){

                if(fridges[i].Clients[0].id_client == req.user.fk_id_client){
                    result.push(fridges[i])

                } 
            }
           
        }
        console.log(result)
        res.json(result)
    })
   
    
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
                            fk_id_fridge:req.params.id      
                        },
                        include:{model:Model.Products},
                        order:[
                            ["updatedAt",'DESC']
                        ]
                    })
    
                    .then(sales =>{
                        res.status(200).json(sales.slice(0,5))
                    })
                }
            })
            
        })
    })

    .catch(error => res.json(error))       
}




// check that fk_product does not have quantity
exports.AddProductQuantity = (req,res) => {

    const {fk_id_product, quantity} = req.body

    const list_fk_product = new Array()
    const list_fk_fridge_product = new Array()

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

                Model.fridges_products.findAll()
                .then(result => {
                    Model.fridges_products.count()
                    .then(numberOfFridgePreset_product => {
                        for(let i =0;i<numberOfFridgePreset_product;i++){
                            list_fk_fridge_product.push(result[i].fk_id_product)
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

                            else if (list_fk_fridge_product.includes(fk_id_product)){
                                res.status(400).json({
                                    message: `fk_id_product ${fk_id_product} has already a quantity assigned`
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
    const { id_fridge,label, fk_id_technologies, fk_id_fridgePreset} = req.body

    const fk_tech_list = new Array()
    const fk_fridgePresetList = new Array()

    const postFridgeSchema = Joi.object().keys({
        id_fridge: Joi.string().required(), 
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
        info: 'Requires: id_fridge, label, fk_id_technologies, fk_id_fridgePreset' 
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
                                id_fridge: id_fridge.toUpperCase(),
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
    let list_fridges_nationalities = []
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
                 

                    if(!list_fk_nationalities.includes(fk_id_nationality)){
                        return res.status(400).json({
                            message:"fk_id_nationalities does not match any id_nationality"
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
                            else {
                                fridge.getNationalities()
                                .then(fridgeNationality => {
                                    for(let i =0;i<fridgeNationality.length;i++){
                                        list_fridges_nationalities.push(fridgeNationality[i].id_nationality)
                                    }

                                   

                                    if(list_fridges_nationalities.includes(fk_id_nationality)){
                                        return res.status(400).json({
                                            message: `Fridge ${req.params.id} has already been assign to nationality ${fk_id_nationality}`
                                        })
                                    }

                                    else {
                                        fridge.addNationalities(fk_id_nationality)
                                        .then(addedNationlity => res.status(200).json(addedNationlity))
                                    }
                                })
                                
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
    let list_frigde_badges = []


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
                        list_fk_badges.push(allBadges[i].id_badges)
                    }

                    if(!list_fk_badges.includes(fk_id_badge)){
                        return res.status(400).json({
                            message:"fk_id_badge does not match any id_badges"
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

                                fridge.getBadges()
                                .then(fridgeBadge => {
                                    for(let i =0;i<fridgeBadge.length;i++){
                                        list_frigde_badges.push(fridgeBadge[i].id_badges)
                                    }

                                    if(list_frigde_badges.includes(fk_id_badge)){
                                        return res.status(400).json({
                                            message: `Fridge ${req.params.id} has already badge ${fk_id_badge}`
                                        })
                                    }

                                    else {
                                        fridge.addBadges(fk_id_badge)
                                        .then(addedBadge => res.status(200).json(addedBadge))
                                    }
                                })
                                
                            }
                        })
                        .catch(error => res.status(400).json(error))
        
                    }
                })
            })             
            .catch(error => res.status(400).json(error))
    }
}

exports.addClientToFridge = (req,res) =>{
    const {fk_id_client} = req.body
    

    let list_fk_clients = []
    let list_fridge_client = []

    const postClienttoFridgeSchema = Joi.object().keys({ 
        fk_id_client : Joi.number().required()
    })

    const result = postClienttoFridgeSchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    if (!valid) {
      res.status(400).json({ 
        message: 'Missing required parameters',
        info: 'Requires: fk_id_client' 
      })
    }

    else {

        Model.Client.findAll()
        .then(allClient => {
            Model.Client.count()
            .then(numberOfClient => {
                for(let i=0;i<numberOfClient;i++){
                    list_fk_clients.push(allClient[i].id_client)
                }

                if(!list_fk_clients.includes(fk_id_client)){
                    return res.status(400).json({
                        message: "fk_id_client does not match any id_client"
                    })
                }

                else {
                    Model.Fridges.findOne({
                        where:{
                            id_fridge:req.params.id
                        }
                    })
                    .then(fridge => {
                        if(!fridge){
                            return res.status(400).json({
                                message: 'Fridge does not exist'
                            })
                        }

                        else {
                            fridge.getClients()
                            .then(client_fridge => {
                                for(let i=0;i<client_fridge.length;i++){
                                    list_fridge_client.push(client_fridge[i].id_client)
                                }

                                if(list_fridge_client.includes(fk_id_client)){
                                    return res.status(400).json({
                                        message:`Fridge ${req.params.id} has already been assigned to client ${fk_id_client}`
                                    })
                                }

                                else {
                                    fridge.addClients(fk_id_client)
                                    .then(client => res.status(200).json(client))
                                    .catch(error => res.status(400).json(error))
                                }
                            })

                        }
                    
                    })
                }
            })
        })

    }
}


exports.addStateToFridge = (req,res) => {

    const {fk_id_state} = req.body
    

    let list_fk_states = []
    let list_fridge_state = []
    let today = new Date()

    let todayFormat = ("0" + today.getDate()).slice(-2) + "-" + ("0"+(today.getMonth()+1)).slice(-2) + "-" +today.getFullYear() + " " + ("0" + today.getHours()).slice(-2) + ":" + ("0" + today.getMinutes()).slice(-2) + ":" +("0" + today.getSeconds()).slice(-2)

    const postStatetoFridgeSchema = Joi.object().keys({ 
        fk_id_state : Joi.number().required()
    })

    const result = postStatetoFridgeSchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    if (!valid) {
      res.status(400).json({ 
        message: 'Missing required parameters',
        info: 'Requires: fk_id_state' 
      })
    }

    else {

        Model.State.findAll()
        .then(allState => {
            Model.State.count()
            .then(numberOfState => {
                for(let i=0;i<numberOfState;i++){
                    list_fk_states.push(allState[i].id_state)
                }

                if(!list_fk_states.includes(fk_id_state)){
                    return res.status(400).json({
                        message: "fk_id_state does not match any id_state"
                    })
                }

                else {
                    Model.Fridges.findOne({
                        where:{
                            id_fridge:req.params.id
                        }
                    })
                    .then(fridge => {
                        if(!fridge){
                            return res.status(400).json({
                                message: 'Fridge does not exist'
                            })
                        }

                        else {
                            fridge.getStates()
                            .then(fridge_state => {
                                for(let i=0;i<fridge_state.length;i++){
                                    list_fridge_state.push(fridge_state[i].id_state)
                                }
                                

                                if(list_fridge_state.includes(fk_id_state)){
                                    return res.status(400).json({
                                        message:`Fridge ${req.params.id} has already been assigned to state ${fk_id_state}`
                                    })
                                }
                                

                                else {
                                    Model.fridges_states.create({
                                        fk_id_state:fk_id_state,
                                        fk_id_fridge:req.params.id,
                                        states_timestamp:todayFormat

                                    })
                                    .then(state => res.status(200).json(state))
                                    .catch(error => res.status(400).json(error))
                                }
                            })

                        }
                    
                    })
                }
            })
        })

    }
    

}
   