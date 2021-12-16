const Model = require("../database/models");
const Joi = require('joi');
const { Op } = require("sequelize");

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
        


// ajout d'un produit dans un preset


exports.addFrontProduct = (req,res) =>{
    const {quantity_max, quantity_min, fk_id_product} = req.body
    let list_fk_product = []
    let listFridgePreset = []
    let coupleFridgeProd = []
    let validation = true

    const postProductSchema = Joi.object().keys({ 
        quantity_min:Joi.number().max(127).required(),
        quantity_max: Joi.number().max(127).required(),
        fk_id_product: Joi.number().required(),
    })


    const valid = postProductSchema.validate(req.body)
    res.send(valid)

    // const {error } = result;

    // const valid = error == null;
    


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

                                        if(Object.keys(req.body).length == 1){

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

                                                    
                                                }

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
                                
                                                    Promise.all(promises)
                                                    .then(function() {
                                                        return res.json(result);
                                                    });
                                                }
                                            })
                                        }
                                    }


                                    else {

                                        if(!valid){
                                            res.status(400).json({
                                                message: 'Please review type and value of input field'
                                            })
                                        }

                                        else {
                                        
                                            
                                            if(!list_fk_product.includes(fk_id_product)){
                                                res.status(400).json({
                                                    message:"fk_id_product does not match any id_product"
                                                })
                                            }
                                            
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
                                                        message:`FridgePreset ${req.params.id} already contains product ${fk_id_product}`
                                                    })
                                                }

                                                else {

                                                return Model.fridgePresets_products.create({
                                                        quantity_max:quantity_max,
                                                        quantity_min:quantity_min,
                                                        fk_id_fridgePreset:req.params.id,
                                                        fk_id_product:fk_id_product
                                                    })
                                                    .then(products=> res.status(200).json(products))
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



// edit Preset
exports.editFrontProduct = (req,res) =>{
    const {quantity_max, quantity_min,fk_id_product} = req.body

    let list_fk_product = []
    let coupleFridgeProd = []
    let validation = true

    const editProductSchema = Joi.object().keys({ 
        quantity_min:Joi.number().max(127),
        quantity_max: Joi.number().max(127),
        fk_id_product:Joi.number()

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
                        if (req.body instanceof Array){

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

                        else {
                            Model.fridgePresets_products.findOne({
                                where:{
                                    [Op.and]: [
                                        { fk_id_fridgePreset:req.params.id },
                                        { fk_id_product: fk_id_product }
                                    ]
                                }
                            })
                            .then(result =>{
                                if(!result){
                                    res.status(400).json({
                                        message:`FridgePreset ${req.params.id} does not contain product ${fk_id_product}`
                                    })
                                }


                                else{

                                    Model.fridgePresets_products.update({
                                        quantity_max:quantity_max,
                                        quantity_min:quantity_min,
                                    },
                                    {
                                        where:{
                                            [Op.and]: [
                                                { fk_id_fridgePreset:req.params.id },
                                                { fk_id_product: fk_id_product }
                                            ]
                                        }
                                    })
                                    .then(res.status(200).json({
                                        message: "Item has been updated"
                                    }))
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

// remove preset
exports.removeProduct = (req,res) =>{
    let list_fk_product = []
    let coupleFridgeProd = []
    let validation = true 


    const {fk_id_product} = req.body
  

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
                            
                                    if (!list_fk_product.includes(req.body[i].fk_id_product)){
                                        validation =false
                                        return res.status(400).json({
                                            message:`Fridgepreset ${req.params.id} does not contains product ${req.body[i].fk_id_product}`
                                        })
                                    }

                                    else if(!coupleFridgeProd.includes(req.body[i].fk_id_product)){
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

                    else {
                        Model.fridgePresets_products.findOne({
                            where:{
                                [Op.and]: [
                                    { fk_id_fridgePreset:req.params.id },
                                    { fk_id_product: fk_id_product }
                                ]
                            }
                        })
                        .then(result =>{
                            if(!result){
                                res.status(400).json({
                                    message:`FridgePreset ${req.params.id} does not contain product ${fk_id_product}`
                                })
                            }

                            else {

                                Model.fridgePresets_products.destroy({
                                    where:{
                                        [Op.and]: [
                                            { fk_id_fridgePreset:req.params.id },
                                            { fk_id_product: fk_id_product }
                                        ]
                                    }
                                })

                                .then(res.status(200).json({
                                    message: "Deletion completed"
                                }))
                            }
                        })
                
                    }
                })
            })
        }
                   
    })
    
    .catch(error => console.log(error))
  
}


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

exports.addMenuInPreset = (req,res) =>{

    const {fk_id_menu} = req.body
    let list_fk_menu = []
    let fridgePreset_menu_list = []

    const postMenuSchema = Joi.object().keys({ 
        fk_id_menu: Joi.number().required()
    })

    const result = postMenuSchema.validate(req.body)

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

                                else {
                                    preset.addMenus(req.body[i].fk_id_menu)
                                }
                            }
                        
                            res.status(200).json({
                                message:`Menus have been added to fridgePreset ${req.params.id}`
                            })
                         
                        }
                    }
                        

                       
              
                    else {
                        if(!list_fk_menu.includes(fk_id_menu)){
                            res.status(400).json({
                                message:"fk_id_menu does not match any id_menu"
                            })
                        }

                        else if(!valid){
                            res.status(400).json({
                                message: 'Missing required parameters',
                                info: 'Requires: fk_id_menu'
                            })
                        }

                        else {

                            preset.getMenus()
                            .then(menu =>{
                                for(let i =0; i< menu.length;i++){
                                    fridgePreset_menu_list.push(menu[i].id_menu)
                                }
                                
                                if(fridgePreset_menu_list.includes(fk_id_menu)){
                                    return res.status(400).json({
                                        message:`FridgePreset ${req.params.id} already contain Menu ${fk_id_menu}`
                                    })
                                }

                                else {
                                    preset.addMenus(fk_id_menu)
                                    .then(res.status(200).json(`Menu ${fk_id_menu} has been added to FridgePreset ${req.params.id}`))
                                    .catch(error => res.status(400).json(error))
                                }
                            })
                           
                        }

                    }

                    
                })
            })
        }
    })
    
}

exports.removeMenuPreset = (req,res) => {
    let list_fk_menu = []
    const {fk_id_menu} = req.body

    // vérif que le fridge Preset contienne bien le menu ciblé pas faisbale sauf création du model fridgeprest_menu
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

                    else {

                        const removeMenuSchema = Joi.object().keys({ 
                            fk_id_menu: Joi.number().required()
                        })
                    
                        const result = removeMenuSchema.validate(req.body)
                    
                        const {error } = result; 
                        const valid = error == null; 

                        if (!valid) {
                            res.status(400).json({ 
                              message: 'Missing required parameters',
                              info: 'Requires: fk_id_menu' 
                            })
                        }

                        else if(!list_fk_menu.includes(fk_id_menu)){
                            return res.status(400).json({
                                message:"fk_id_menu does not match any id_menu"
                            })
                        }

                        else {
                            preset.removeMenus(fk_id_menu)
                            .then(res.status(200).json({
                                message:"Deletion completed"
                            }))
                        }
                    }
                })
            })

        }
    })

}