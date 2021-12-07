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
        include:[{
            model:Model.FridgePresets
        }]
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
    

}


   
    

exports.listClientByFridge = (req,res) => {
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
            return fridge.getClients()
        }

    })
    .then(clients =>{
        if(clients.length == 0){
            return res.status(400).json({
                message:`Fridge with id ${req.params.id} does not have any client`
            })
        }

        else {
            return res.status(200).json(clients)
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
            return fridge.getBadges()
    
            .then(badges =>{
                if(badges.length == 0){
                    return res.status(400).json({
                        message:`Fridge with id ${req.params.id} does not have any badge`
                    })
                }

                else {
                    return res.status(200).json(badges)
                }
            })
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
            return res.status(400).json({
                message: 'Fridge does not exist',
            });
        }

        else {
            return fridge.getMenus()  
            .then(menus =>{
                if(menus.length == 0){
                    return res.status(400).json({
                        message:`Fridge with id ${req.params.id} does not have any menu`
                    })
                }

                else {
                    return res.status(200).json(menus)
                }
            })
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


        }) 
    })
    .catch(error => res.json(error))
}


exports.listProductsBySaleByFridge = (req,res) => {
    let id_list = new Array()

    Model.Sales.findAll()
    .then(allSales => {
        Model.Sales.count()
        .then(numberOfSale =>{
            for(let i=0;i<numberOfSale;i++){
                id_list.push(allSales[i].id_sale)
            }

            if(allSales.includes(Number(req.params.id))){
                return res.status(400).json({
                    message:"Sale does not exists"
                })
            }

            else{

                Model.Fridges.findOne({
                    where:{
                        id_fridge: req.params.id
                    }
                })

                .then(fridge => {

                    Model.Sales.findAll({
                    where:{
                        fk_id_fridge:fridge.id_fridge       // faire un orderBy -> comparer string + slice pour prendre les 5 premiers
                    },
                    include:{model:Model.Products},
                    order:[
                        ["updatedAt",'DESC']
                    ]
                })
    
                .then(sales =>{
                    if (!sales) {
                        return res.status(400).json({
                            message: 'Sale does not exist or does not have any product related',
                        });
                    }
    
                    else {
                        res.status(200).json(sales.slice(0,5))
                    }
                })
                })
                

            }
        })
    })

    .catch(error => res.json(error))       
}


// add quantity/ edit quantity/ delete quantity(removeproduct)



exports.AddProductQuantity = (req,res) => {

    const {fk_id_product, quantity} = req.body

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
          info: 'Requires: quantity, fk_id_product, fk_id_fridge' 
        })
      }

    else {
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

        else {
            Model.fridges_products.create({
                fk_id_product:fk_id_product,
                fk_id_fridge:req.params.id,
                quantity:quantity
            })

            .then(fridge_product => res.status(200).json(fridge_product))
            
        }
    })
    }

   


}


exports.EditProductQuantity = (req,res) => {

    const {quantity} = req.body

    const editQuantitySchema = Joi.object().keys({ 
        quantity : Joi.number(),
    })

    const result = editQuantitySchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    if (!valid) {
        res.status(400).json({ 
          message: 'One or other parameters are not well written',
        })
      }

    else {
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

            .then(res.status(200).json("Modification apply"))
            
        }
    })
    }

   


}




exports.RemoveProductQuantity = (req,res) => {

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

        else {
            Model.fridges_products.destroy({
                where:{
                    [Op.and]: [
                        { fk_id_fridge:req.params.id },
                        { fk_id_product: req.params.productId }
                    ]
                }
            })

            .then(res.status(200).json("Deletion completed"))
            
        }
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

/*********************** Ajouter le fait que la foreign key ne peut avoir comme valeur que les id présent dans la table source (level : 1:2:3 => user ne peut avoir en fk que 1, 2 et 3) */

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

        Model.Technologies.findAll({
            attributes: ["id_technologies"]
        })
        .then(allTechs =>{
            Model.Technologies.count()
            .then(numberofTech =>{
                for(let i=0;i<numberofTech;i++){
                    fk_tech_list.push(allTechs[i].id_technologies)
                }

                Model.FridgePresets.findAll({
                    attributes: ["id_fridgePresets"]
                })
                .then(allPreset =>{
                    Model.FridgePresets.count()
                    .then(numberofPreset =>{
                        for(let i=0;i<numberofPreset;i++){
                            fk_fridgePresetList.push(allPreset[i].id_fridgePresets)
                        }

                    })

                    if(!fk_tech_list.includes(fk_id_technologies)){
                        return res.status(400).json({
                            message:"fk_id_technologies does not match any id_technologies"
                        })
                    }

                //    else if(!fk_fridgePresetList.includes(fk_id_fridgePreset)){
                //         return res.status(400).json({
                //             message:"fk_id_fridgePreset does not match any id_fridgePresets"
                //         })
                //     }

                    else {
                        Model.Fridges.create({
                        label : label,
                        fk_id_technologies:fk_id_technologies,
                        fk_id_fridgePreset:fk_id_fridgePreset
                    })

                    .then(fridge => res.status(200).json(fridge))
            
            }
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
            .then(res.send("Modification apply"))
        }
    })
    
    .catch(error => console.log(error))

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
            }).then(res.send(`Fridge with id : ${req.params.id} has been deleted`))
        }

    )
    .catch(error => res.status(400).json(error))
}

