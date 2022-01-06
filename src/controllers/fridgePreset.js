const Model = require("../database/models");
const Joi = require('joi');
const { Op } = require("sequelize");


// Renvoi la liste de tous les fridgePreset

exports.listFridgePreset = (req, res) => {
    Model.FridgePresets.findAll()
    .then(fridgePreset => res.status(200).json(fridgePreset))
    .catch(error => res.status(400).json(error))
}

// Renvoi la liste de tous les fridgePreset associés à l'utilisateur connecté

exports.getFridgePresetForUser = (req,res) => {
    Model.FridgePresets.findAll({
        where:{
            fk_id_client: req.user.fk_id_client
        }
    })
    .then(preset =>res.status(200).json(preset))
    .catch(error => res.staus(400).json(error))
}

// Récupère un fridgePreset par son id

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

// Récupère l'ensemble des produits contenus dans un fridgePreset

exports.getProductinPreset = (req,res) => {
    Model.FridgePresets.findOne({
        where:{
            id_fridgePresets:req.params.id
        },
        include:{model:Model.Products}
    })
    .then(preset => res.status(200).json(preset))
    .catch(error => res.status(400).json(error))
}

// Récupère l'ensemble des produits contenus dans les fridgePresets associés à l'utilisateur connecté

exports.getProductinPresetForUser = (req,res) => {
    let preset_ids = []
    Model.FridgePresets.findAll({
        where:{
            fk_id_client:req.user.fk_id_client
        },
    })
    .then(userPreset => {
        for(let i =0;i<userPreset.length;i++){
            preset_ids.push(userPreset[i].id_fridgePresets)
        }

        if(!preset_ids.includes(Number(req.params.id))){
            res.status(400).json({
                message: `You are not all allowed to see content of fridgePreset ${req.params.id}`
            })
        }
        else {
            Model.FridgePresets.findOne({
                where:{
                    id_fridgePresets:req.params.id
                },
                include:{model:Model.Products}
            })
            .then(preset => res.status(200).json(preset))
            .catch(error => res.status(400).json(error))
        }
        
    })

}


// Ajoute un fridgePreset

exports.addFridgePreset = (req,res) =>{
    const {label} = req.body;

    let list_label= []


    const postFridgePresetSchema = Joi.object().keys({ 
        label: Joi.string().required(),
    })

    const result = postFridgePresetSchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    if (!valid) {
        res.status(400).json({ 
            message: 'Missing required parameters',
            info: 'Requires: label' 
        })
    }



    else {

        Model.FridgePresets.findAll()
        .then(allpreset => {
            Model.FridgePresets.count()
            .then(numberOfPreset => {
                for(let i =0;i<numberOfPreset;i++){
                    list_label.push(allpreset[i].label)
                }

                if(list_label.includes(label)){
                    res.status(400).json({
                        message:"This label already exists"
                    })
                }

                else {

                    Model.Client.findOne({
                        where:{
                            id_client:req.user.fk_id_client
                        }
                    })
                    .then(client => {
                        Model.FridgePresets.create({
                            label: label,
                            fk_id_client:client.id_client
                        })
        
                        .then(fridgePreset => res.status(200).json(fridgePreset))
                        .catch(error => res.status(400).json(error))
                    })
                    
                }
            })
        })       
    }
}

// Modifie un fridgepresets

exports.editFridgePreset = (req,res) => {
    const {label} = req.body;

    const editFridgePresetSchema = Joi.object().keys({ 
        label: Joi.string(),
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

            Model.FridgePresets.update({
                label: label,
            },
            {   
                where : {
                    id_fridgePresets: req.params.id
                }
            })
            res.status(200).json({
                message: "Item has been updated"}
            )
                    
        }
    })
    
    .catch(error => console.log(error))
}

// Supprime un fridgePreset

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

        else {
            Model.FridgePresets.destroy({
                where: {
                    id_fridgePresets: req.params.id
                }
            })
            .then(res.status(200).json({
                message: `FridgePreset with id : ${req.params.id} has been deleted`})
            )}
        }
    )
    .catch(error => res.status(400).json(error))
}
        


// Ajout d'un produit dans un fridgePreset (donc ajout d'une quantité_min et d'une quantité_max)

exports.addFrontProduct = (req,res) =>{

    let list_fk_product = []
    let listFridgePreset = []
    let coupleFridgeProd = []
    let validation = true // booléen passant à false si une erreur survient, cela permet de parcourir toute la réponse pour effecuter les tests et donc d'arrêter le processus si une errur survient


    const arraySchema = Joi.array().items(
        Joi.object({
            fk_id_product: Joi.number().required(),
            quantity_min: Joi.number().max(127).required(),
            quantity_max: Joi.number().max(127).required()
        })
    )


    const result = arraySchema.validate(req.body)

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

                            if (req.body instanceof Array){  // On vérifie que la réponse est bien un tableau

                                var result = [];

                                if(Object.keys(req.body).length == 1){ // Si il n'y a qu'un seul élément

                                    Model.fridgePresets_products.findOne({
                                        where: {
                                            [Op.and]: [
                                                { fk_id_fridgePreset: req.params.id },
                                                { fk_id_product: req.body[0].fk_id_product }
                                            ]
                                        }
                                    })
                                    .then(result => {
                                        if(result){
                                            res.status(400).json({
                                                message:`FridgePreset ${req.params.id} already contains product ${req.body[0].fk_id_product}`
                                            })
                                        }

                                        else if(!valid){
                                            return res.status(400).json({
                                                message:"Please review input paramaters type and value"
                                            })
                                        }


                                        else {
                                            Model.fridgePresets_products.create({
                                                quantity_max:req.body[0].quantity_max,
                                                quantity_min:req.body[0].quantity_min,
                                                fk_id_fridgePreset:req.params.id,
                                                fk_id_product:req.body[0].fk_id_product
                                            })
                                            .then(product => res.status(200).json(product))
                                            .catch(error => res.status(400).json(error))
                                        }
                                    })
                                }
                                
                                // Sinon la réponse contient plusieurs éléments
                                else {
                                    Model.fridgePresets_products.findAll({
                                        where:{
                                            fk_id_fridgePreset: req.params.id
                                        }
                                    })
                                    .then(preset => {
                                        for(i=0;i<preset.length;i++){
                                            coupleFridgeProd.push(preset[i].fk_id_product)
                                            
                                        }
                                    

                                        for(i =0;i<(Object.keys(req.body).length);i++){

                                            if(!list_fk_product.includes(req.body[i].fk_id_product)){
                                                validation = false
                                                return res.status(400).json({
                                                    message:"fk_id_product does not match any id_product"
                                                })
                                            }

                                            else if(coupleFridgeProd.includes(req.body[i].fk_id_product)){
                                                validation = false
                                                return res.status(400).json({
                                                    message:`FridgePreset ${req.params.id} already contains product ${req.body[i].fk_id_product}`
                                                })
                                                
                                            }

                                            else if(!valid){
                                                validation = false
                                                return res.status(400).json({
                                                    message:"Please review input paramaters type and value"
                                                })
                                            }

                                            
                                        }

                                        // Si il n'y a aucune erreur dans les paramètres passés
                                        if(validation){
                                            var promises = req.body.map(function(product) {

                                                return Model.fridgePresets_products.create({
                                                    quantity_max:product.quantity_max,
                                                    quantity_min:product.quantity_min,
                                                    fk_id_fridgePreset:req.params.id,
                                                    fk_id_product:product.fk_id_product
                                                })

                                                .then(function() {
                                                    result.push(product);
                                                })
                                            })
                        
                                            Promise.all(promises) // On retourne le tableau créé
                                            .then(function() {
                                                return res.json(result);
                                            });
                                        }
                                    })
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



// Modification de la quantité min et de la quantité max d'un produit contenu dans un fridgePreset
exports.editFrontProduct = (req,res) =>{

    let list_fk_product = []
    let coupleFridgeProd = []
    let validation = true

    const arraySchema = Joi.array().items(
        Joi.object({
            quantity_min: Joi.number().max(127),
            quantity_max: Joi.number().max(127),
            fk_id_product:Joi.number()
        })
    )

    const result = arraySchema.validate(req.body)

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
                .then(numberofproduct => {
                    for (let i = 0;i< numberofproduct;i++){
                        list_fk_product.push(allProduct[i].id_product)
                    }

                    if(Object.keys(req.body).length == 0){
                        res.status(400).json({
                            message:"No parameters were passed"
                        })
                    }

                    else {
                        if (req.body instanceof Array){     // On retrouve le raisonnement de l'ajout de produit (cela permet d'éviter d'effectuer de multiples appels à l'api)

                            var result = [];

                            if(Object.keys(req.body).length == 1){

                                Model.fridgePresets_products.findOne({
                                    where: {
                                        [Op.and]: [
                                          { fk_id_fridgePreset: req.params.id },
                                          { fk_id_product: req.body[0].fk_id_product }
                                        ]
                                    }
                                })
                                .then(fridgePres => {

                                    if(!fridgePres){
                                        validation = false
                                        res.status(400).json({
                                            message:`FridgePreset ${req.params.id} does not contains product ${req.body[0].fk_id_product}`
                                        })
                                    }

                                    else if(!valid){
                                        validation = false
                                        return res.status(400).json({
                                            message:"Please review type and value of input field"
                                        })
                                    }

                                    else {
                                        Model.fridgePresets_products.update({
                                            quantity_max:req.body[0].quantity_max,
                                            quantity_min:req.body[0].quantity_min,
                                        },
                                        {
                                            where:{
                                                [Op.and]: [
                                                    { fk_id_fridgePreset:req.params.id },
                                                    { fk_id_product: req.body[0].fk_id_product }
                                                ]
                                            }
                                        })
                                        res.status(200).json({
                                            message:"Item has been updated"
                                        })
                                    }
                                })
                            }
                            

                            else {

                                Model.fridgePresets_products.findAll({
                                    where:{
                                        fk_id_fridgePreset: req.params.id
                                    }
                                })
                                .then(preset => {
                                    for(i=0;i<preset.length;i++){
                                        coupleFridgeProd.push(preset[i].fk_id_product)
                                       
                                    }

                                    for(i =0;i<(Object.keys(req.body).length);i++){
                                        
                                        if(!list_fk_product.includes(req.body[i].fk_id_product)){
                                            validation = false
                                            return res.status(400).json({
                                                message:"fk_id_product does not match any id_product"
                                            })
                                        }

                                        else if(!coupleFridgeProd.includes(req.body[i].fk_id_product)){
                                            validation = false
                                            return res.status(400).json({
                                                message:`FridgePreset ${req.params.id} does not contains product ${req.body[i].fk_id_product}`
                                            })
                                            
                                        }

                                        else if(!valid){
                                            validation = false
                                            return res.status(400).json({
                                                message:"Please review type and value of input field"
                                            })
                                        }

                                        
                                    }

                                    if(validation){
                                        var promises = req.body.map(function(product) {
                                            return Model.fridgePresets_products.update({
                                                quantity_max:product.quantity_max,
                                                quantity_min:product.quantity_min,
                                                fk_id_fridgePreset:req.params.id,
                                            },
                                            {
                                                where:{
                                                    [Op.and]: [
                                                        { fk_id_fridgePreset:req.params.id },
                                                        { fk_id_product: product.fk_id_product }
                                                    ]
                                                }
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
                                })
                            }
                        } 
                    }

                })
            }) 
        }
      
    })
    
    .catch(error => console.log(error))

}

// Supprime un produit d'un fridgePreset (une nouvelle fois le body est un tableau)

exports.removeProduct = (req,res) =>{
    let list_fk_product = []
    let coupleFridgeProd = []
    let validation = true 


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
                .then(numberofproduct => {
                    for (let i = 0;i< numberofproduct;i++){
                        list_fk_product.push(allProduct[i].id_product)
                    }

                    if (req.body instanceof Array){

                        var result = [];

                        if(Object.keys(req.body).length == 1){
                            Model.fridgePresets_products.findOne({
                                where:{
                                    [Op.and]: [
                                        { fk_id_fridgePreset:req.params.id },
                                        { fk_id_product: req.body[0].fk_id_product }
                                    ]
                                }
                            })
                            .then(fridgePreset =>{
                                if(!fridgePreset){
                                    res.status(400).json({
                                        message:`FridgePreset ${req.params.id} does not contain product ${req.body[0].fk_id_product}`
                                    })
                                }
                                else {
                                    Model.fridgePresets_products.destroy({
                                    
                                        where:{
                                            [Op.and]: [
                                                { fk_id_fridgePreset:req.params.id },
                                                { fk_id_product: req.body[0].fk_id_product }
                                            ]
                                        }
                                    })
                                    return res.status(200).json({
                                        message:"Deletion completed"
                                    })
                                }
                            })
                                
                            
                        }
                        

                        else {

                            Model.fridgePresets_products.findAll({
                                    where:{
                                        fk_id_fridgePreset: req.params.id
                                    }
                            })
                            .then(preset => {
                                for(i=0;i<preset.length;i++){
                                    coupleFridgeProd.push(preset[i].fk_id_product)
                                    
                                }

                                for(i =0;i<(Object.keys(req.body).length);i++){

                                    if(!coupleFridgeProd.includes(req.body[i].fk_id_product)){
                                        validation = false
                                        return res.status(400).json({
                                            message:`FridgePreset ${req.params.id} does not contains product ${req.body[i].fk_id_product}`
                                        })
                                        
                                    }
                                }

                                if(validation){
                                    var promises = req.body.map(function(product) {
                                        return Model.fridgePresets_products.destroy(
                                        {
                                            where:{
                                                [Op.and]: [
                                                    { fk_id_fridgePreset:req.params.id },
                                                    { fk_id_product: product.fk_id_product }
                                                ]
                                            }
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

                            })

                        }

                       

                    }
                })
            })
        }
                   
    })
    
    .catch(error => console.log(error))
  
}

// Retourne l'ensemble des menus associés à un fridgePreset

exports.getMenuByFridgePreset = (req,res) =>{
    Model.FridgePresets.findOne({
        where:{
            id_fridgePresets:req.params.id
        },
    })
    .then(preset =>{

        if(!preset){
            res.status(400).json({
                message: "FridgePreset does not exists"
            })
        }

        else {
            preset.getMenus()
            .then(menus => {
                if(menus.length == 0){
                    res.status(400).json({
                        message: `FridgePreset ${req.params.id} does not have any menu`
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

// Retourne l'ensemble des menus associés aux fridgePresets parmi les fridgePresets associés à l'utilisateur connecté 
exports.getMenuByFridgePresetForUser = (req,res) => {

    let preset_ids = []
    Model.FridgePresets.findAll({
        where:{
            fk_id_client:req.user.fk_id_client
        },
    })
    .then(userPreset => {
        for(let i =0;i<userPreset.length;i++){
            preset_ids.push(userPreset[i].id_fridgePresets)
        }

        if(!preset_ids.includes(Number(req.params.id))){
            res.status(400).json({
                message: `You are not all allowed to see content of fridgePreset ${req.params.id}`
            })
        }
        else {
            Model.FridgePresets.findOne({
                where:{
                    id_fridgePresets:req.params.id
                },
            })
            .then(preset =>{
        
                if(!preset){
                    res.status(400).json({
                        message: "FridgePreset does not exists"
                    })
                }
        
                else {
                    preset.getMenus()
                    .then(menus => {
                        if(menus.length == 0){
                            res.status(400).json({
                                message: `FridgePreset ${req.params.id} does not have any menu`
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
    })

}

// Associe un menu à un fridgePreset (le body est un array)
// Dans ce cas on est obligé de passer par les fonctions crées par sequelize car la table de liaison reliant FridgePreset à Menu n'existe pas dans le dossier "models"

exports.addMenuInPreset = (req,res) =>{

    let list_fk_menu = []
    let fridgePreset_menu_list = []

    const arraySchema = Joi.array().items(
        Joi.object({
            fk_id_menu: Joi.number().required(),
        })
    )
    const result = arraySchema.validate(req.body)

    const {error } = result; 
    const valid = error == null; 

    Model.FridgePresets.findOne({
        where:{
            id_fridgePresets:req.params.id
        },
    })
    .then(preset =>{

        if(!preset){
            res.status(400).json({
                message: "FridgePreset does not exists"
            })
        }

        else {
            Model.Menus.findAll()
            .then(allMenus => {
                Model.Menus.count()
                .then(numberOfMenu => {
                    for(let i =0;i<numberOfMenu;i++){
                        list_fk_menu.push(allMenus[i].id_menu)
                    }
                    
                    if (req.body instanceof Array){

                        if(Object.keys(req.body).length == 1){
                            if(!list_fk_menu.includes(req.body[0].fk_id_menu)){
                                return res.status(400).json({
                                    message:"fk_id_menu does not match any id_menu"
                                })
                            }
                            
                            else {

                                preset.getMenus()
                                .then(menu =>{
                                    for(let i =0; i< menu.length;i++){
                                        fridgePreset_menu_list.push(menu[i].id_menu)
                                    }
                                    
                                    if(fridgePreset_menu_list.includes(req.body[0].fk_id_menu)){
                                        return res.status(400).json({
                                            message:`FridgePreset ${req.params.id} already contain Menu ${req.body[0].fk_id_menu}`
                                        })
                                    }

                                    else if(!valid){
                                        return res.status(400).json({
                                            message:"Please review type and value of input field"
                                        })
                                    }

                                    else {
                                        preset.addMenus(req.body[0].fk_id_menu) 
                                        res.status(200).json({
                                            message:`Menu has been added to fridgePreset ${req.params.id}`
                                        })
                                    }

                                })
                            }
                        }

                        else {
                            for(let i=0;i<req.body.length;i++){
                            
                                if(!list_fk_menu.includes(req.body[i].fk_id_menu)){
                                    return res.status(400).json({
                                        message:"fk_id_menu does not match any id_menu"
                                    })
                                }

                                else if(!valid){
                                    return res.status(400).json({
                                        message:"Please review type and value of input field"
                                    })
                                }

                                else {
                                    preset.addMenus(req.body[i].fk_id_menu)
                                }
                            }
                        
                            res.status(200).json({
                                message:`Menus have been added to fridgePreset ${req.params.id}`
                            })
                         
                        }
                    }

                })
            })
        }
    })
    
}

// Supprime un menu d'un preset (le body est un tableau)
exports.removeMenuPreset = (req,res) => {
    let list_fk_menu = []

    // Le fait de vériffier que le fridgePreset contienne bien le menu ciblé n'est pas faisable sauf en créant un model fridgepreset_menu ce qui permet d'y accéder par la suite
 
    Model.FridgePresets.findOne({
        where:{
            id_fridgePresets: req.params.id
        }
    })
    .then(preset => {
        if(!preset){
            res.status(400).json({
                message : "FridgePreset does not exists"
            })
        }

        else {
            Model.Menus.findAll()
            .then(allMenus => {
                Model.Menus.count()
                .then(numberOfMenus => {
                    for(let i =0; i< numberOfMenus;i++){
                        list_fk_menu.push(allMenus[i].id_menu)
                    }

                    if (req.body instanceof Array){

                        if(Object.keys(req.body).length == 1){
                            if(!list_fk_menu.includes(req.body[0].fk_id_menu)){
                                return res.status(400).json({
                                    message:"fk_id_menu does not match any id_menu"
                                })
                            }
                            
                            else {
                                preset.removeMenus(req.body[0].fk_id_menu)
                            }

                            res.status(200).json({
                                message:"Menu has been deleted"
                            })
                             

                        }

                        else {
                            for(let i=0;i<req.body.length;i++){
                            
                                if(!list_fk_menu.includes(req.body[i].fk_id_menu)){
                                    return res.status(400).json({
                                        message:"fk_id_menu does not match any id_menu"
                                    })
                                }

                                else {
                                    preset.removeMenus(req.body[i].fk_id_menu)
                                }
                            }
                        
                            res.status(200).json({
                                message:"Menus have been deleted"
                            })
                         
                        }
                    }
                })
            })

        }
    })

}