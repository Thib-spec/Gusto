const Model = require("../database/models");
const Joi = require('joi');
const { Op, json } = require("sequelize");
const { signedCookie } = require("cookie-parser");

exports.listFridgePreset = (req, res) => {
    Model.FridgePresets.findAll()
    .then(fridgePreset => res.status(200).json(fridgePreset))
    .catch(error => res.status(400).json(error))
}


exports.getFridegPresetById = (req,res) => {
    Model.FridgePresets.findOne({
        where:{
            id_fridgePresets : req.params.id
        },
    })
    .then((fridgePreset) => {
        if (!fridgePreset) {
            return res.status(400).json({
                message: 'FridgePreset not found',
            });
        }

        else {
            return res.status(200).json(fridgePreset)
        }
    })
    .catch(error => res.status(400).json(error))
 
    
}



exports.addFridgePreset = (req,res) =>{
    const {label,fk_id_client} = req.body;

    const list_fk_client = new Array()


    const postFridgePresetSchema = Joi.object().keys({ 
        label: Joi.string().required(),
        fk_id_client: Joi.number().required()
    })

    const result = postFridgePresetSchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    if (!valid) {
        res.status(400).json({ 
            message: 'Missing required parameters',
            info: 'Requires: label, fk_id_client' 
        })
    }



    else {

        Model.Client.findAll()
        .then(allClient => {
            Model.Client.count()
            .then(numberOfClient => {
                for(let i =0;i<numberOfClient;i++){
                    list_fk_client.push(allClient[i].id_client)
                }

                if(!list_fk_client.includes(fk_id_client)){
                    res.status(400).json({
                        message:"fk_id_client does not match any id_client"
                    })
                }

                else {
                    Model.FridgePresets.create({
                        label: label,
                        fk_id_client:fk_id_client
                    })
            
                    .then(fridgePreset => res.status(200).json(fridgePreset))
                    .catch(error => res.status(400).json(error))
                }
            })
        })       
    }
}


exports.editFridgePreset = (req,res) => {
    const {label,fk_id_client} = req.body;
    const list_fk_client = new Array()

    const editFridgePresetSchema = Joi.object().keys({ 
        label: Joi.string(),
        fk_id_client: Joi.number()
    })

    const result = editFridgePresetSchema.validate(req.body)

    const {error } = result; 
    const valid = error == null; 

    Model.FridgePresets.findOne({
        where: {
            id_fridgePresets: req.params.id
        }
    })

    .then((fridgePreset) => {
        if (!fridgePreset) {
            return res.status(400).json({
                message: 'FridgePreset not found',
            });
        }

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
            
            Model.Client.findAll()
            .then(allClient => {
                Model.Client.count()
                .then(numberOfClient => {
                    for(let i =0;i<numberOfClient;i++){
                        list_fk_client.push(allClient[i].id_client)
                    }
    
                    if(!list_fk_client.includes(fk_id_client) && fk_id_client){
                        res.status(400).json({
                            message:"fk_id_client does not match any id_client"
                        })
                    }
                    else {
                          Model.FridgePresets.update({
                            label: label,
                            fk_id_client:fk_id_client
                        },
                        {
                            where : {
                                id_fridgePresets: req.params.id
                            }
                        })
                        res.status(200).json({
                            message: "Modification apply"}
                        )
                    }
                })
            })
        }
    })
    
    .catch(error => console.log(error))
}


exports.deleteFridgePreset = (req,res) => {
    
    Model.FridgePresets.findOne({
        where: {
            id_fridgePresets: req.params.id
        }
    })
    .then((FridgePreset) => {
        if (!FridgePreset) {
            return res.status(400).json({
                message: 'FridgePreset not found',
            });
        }
    Model.FridgePresets
            .destroy({
                where: {
                    id_fridgePresets: req.params.id
                }
            })
            .then(res.status(200).json({
                message: `FridgePreset with id : ${req.params.id} has been deleted`})
            )
        }

    )
    .catch(error => res.status(400).json(error))
}
        


// ajout d'un produit dans un preset

exports.addFrontProduct = (req,res) =>{
    const {quantity_max, quantity_min, fk_id_product} = req.body
    const list_fk_product = new Array()
    const listFridgePreset =new Array()

    const postProductSchema = Joi.object().keys({ 
        quantity_min:Joi.number().required(),
        quantity_max: Joi.number().required(),
        fk_id_product: Joi.number().required(),
    })

    const result = postProductSchema.validate(req.body)

    const {error } = result;

    const valid = error == null;
    


    Model.FridgePresets.findOne({
        where:{
            
            id_fridgePresets:req.params.id
        },
    })
    .then(fridgePreset=> {
        if (!fridgePreset) {
            return res.status(400).json({
                message: 'FridgePreset does not exist',
            });
        }
        

 

        else {

            Model.Products.findAll()
            .then(allProduct => {
                Model.Products.count()
                .then(numberOfProduct => {
                    for(let i =0;i<numberOfProduct;i++){
                        list_fk_product.push(allProduct[i].id_product)
                    }
                    
                    Model.fridgePresets_products.findAll()
                            .then(allInfo =>{
                                Model.fridgePresets_products.count()
                                .then(numberOfFridgePresets_products => {
                                    for(let i =0;i<numberOfFridgePresets_products;i++){
                                        listFridgePreset.push(allInfo[i].fk_id_product)

                                    }

                                    if (req.body instanceof Array){

                                        var result = [];

                                        for(i =0;i<(Object.keys(req.body).length) -1;i++){
                                            for(j =1;j<Object.keys(req.body).length;j++){

                                            
                                                if(!list_fk_product.includes(req.body[i].fk_id_product)){
                                                    return res.status(400).json({
                                                        message:"fk_id_product does not match any id_product"
                                                    })
                                                }

                                                else if (listFridgePreset.includes(req.body[i].fk_id_product)){
                                                    return res.status(400).json({
                                                        message:`Fridgepreset ${req.params.id} already contains product ${req.body[i].fk_id_product}`
                                                    })
                                                }

                                            
                                                else if (req.body[i].fk_id_product == req.body[j].fk_id_product){
                                                    return res.status(400).json({
                                                        message: `fk_id_product ${req.body[j].fk_id_product} has been already put`
                                                    })
                                                } 
                                                
                                                
                                                var promises = req.body.map(function(product) {
                                                    Model.fridgePresets_products.create({
                                                    quantity_max:product.quantity_max,
                                                    quantity_min:product.quantity_min,
                                                    fk_id_fridgePreset:req.params.id,
                                                    fk_id_product:product.fk_id_product
                                                    })

                                                .then(function() {
                                                    result.push(product);
                                                })
                                            
                                            })
                                        
                                            Promise.all(promises)
                                                .then(function() {
                                                return res.json(result);
                                            });  
                                        }
                                    }
                                }


                                else {

                                    if(!valid){
                                        res.status(400).json({
                                            message: 'Missing required parameters',
                                            info: 'Requires: quantity_min, quantity_max,fk_id_product'
                                        })
                                    }

                                    else{

                                        if(!list_fk_product.includes(fk_id_product)){
                                            res.status(400).json({
                                                message:"fk_id_product does not match any id_product"
                                            })
                                        }
                                        else if (listFridgePreset.includes(fk_id_product)){
                                            res.status(400).json({
                                                message:`Fridgepreset ${req.params.id} already contains product ${fk_id_product}`
                                            })
                                        }

                                        else {

                                            Model.fridgePresets_products.create({
                                                quantity_max:quantity_max,
                                                quantity_min:quantity_min,
                                                fk_id_fridgePreset:req.params.id,
                                                fk_id_product:fk_id_product
                                            })
                                            .then(products=> res.status(200).json(products))
                                        }
                                    }
                                }

                                    
        
                                   
                                

                                
                            })
                        })   
                })
            })

            
        }
    })
    
    .catch(error => console.log(error))

}



// edit Preset
exports.editFrontProduct = (req,res) =>{
    const {quantity_max, quantity_min} = req.body

    const editProductSchema = Joi.object().keys({ 
        quantity_min:Joi.number(),
        quantity_max: Joi.number(),
    })

    const result = editProductSchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    

    Model.FridgePresets.findOne({
        where:{
            id_fridgePresets:req.params.id
        },
    })
    .then(fridgePreset=> {
        if (!fridgePreset) {
            return res.status(400).json({
                message: 'FridgePreset does not exist',
            });
        }

        else {
            if (!valid) {
                res.status(400).json({ 
                  message: 'One or more parameters are not correctly written',
                })
              }

            else {

                Model.fridgePresets_products.update({
                    quantity_max:quantity_max,
                    quantity_min:quantity_min,
                },
                {
                    where:{
                        [Op.and]: [
                            { fk_id_fridgePreset:req.params.id },
                            { fk_id_product: req.params.productId }
                        ]
                    }
                })
                .then(res.status(200).json({
                    message: "Modification apply"
                })
            )
           
        }
    }
      
    })
    
    .catch(error => console.log(error))

}

// remove preset
exports.removeProduct = (req,res) =>{

    Model.FridgePresets.findOne({
        where:{
            id_fridgePresets:req.params.id
        },
    })
    .then(fridgePreset=> {
        if (!fridgePreset) {
            return res.status(400).json({
                message: 'FridgePreset does not exist',
            });
        }

        else {

            Model.fridgePresets_products.destroy({
                where:{
                    [Op.and]: [
                        { fk_id_fridgePreset:req.params.id },
                        { fk_id_product: req.params.productId }
                    ]
                }
            })

            .then(res.status(200).json({
                message: "Deletion completed"
            })
        )
           
        }
    })
    .catch(error => console.log(error))
  
}