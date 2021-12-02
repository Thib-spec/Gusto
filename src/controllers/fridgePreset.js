const Model = require("../database/models");
const Joi = require('joi');
const { Op } = require("sequelize");

// ajout d'un produit dans un preset

exports.addFrontProduct = (req,res) =>{
    const {quantity_max, quantity_min, fk_id_product} = req.body

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
            if (!valid) {
                res.status(400).json({ 
                  message: 'Missing required parameters',
                  info: 'Requires: quantity_min, quantity_max, fk_id_product' 
                })
            }
            else {

                Model.fridgePresets_products.create({
                    quantity_max:quantity_max,
                    quantity_min:quantity_min,
                    fk_id_fridgePreset:req.params.id,
                    fk_id_product:fk_id_product
    
                })
           
                .then(products=> res.json(products))
            }
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