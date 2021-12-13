const Model = require("../database/models");
const Joi = require('joi');


exports.listSales = (req, res) => {
    Model.Sales.findAll()
    .then(sales => res.status(200).json(sales))
    .catch(error => res.status(400).json(error))
}


exports.getSaleById = (req,res) => {
    Model.Sales.findOne({
        where:{
            id_sale: req.params.id
        }
    })
    .then((sale) => {
        if (!sale) {
            return res.status(400).json({
                message: 'Sale does not exist',
            });
        }

        else {
            return res.status(200).json(sale)
        }
    })
    .catch(error => res.json(error))
}


exports.addSale = (req,res) =>{
    const { sales_timestamp, cbemv_amount, cbcless_amount,lv_amount,lv_quantity,cash_amount, fk_id_fridge} = req.body

    const list_fk_fridge = new Array()

    const postSalesSchema = Joi.object().keys({ 
        sales_timestamp : Joi.string().required(),
        cbemv_amount:Joi.number().required(),
        cbcless_amount:Joi.number().required(),
        lv_amount:Joi.number().required(),
        lv_quantity:Joi.number().required(),
        cash_amount:Joi.number().required(),
        fk_id_fridge: Joi.number().required()
        
    })

    const result = postSalesSchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    if (!valid) {
      res.status(400).json({ 
        message: 'Missing required parameters',
        info: 'Requires: sales_timestamp, cbemv_amount, cbcless_amount,lv_amount,lv_quantity,cash_amount, fk_id_fridge' 
      })
    }
    else {

        Model.Fridges.findAll()
        .then(allFridges => {
            Model.Fridges.count()
            .then(numberOfFridge => {
                for(let i =0;i<numberOfFridge;i++){
                    list_fk_fridge.push(allFridges[i].id_fridge)
                }

                if(!list_fk_fridge.includes(fk_id_fridge)){
                    res.status(200).json({
                        message: "fk_id_fridge does not match any id_fridge"
                    })
                }

                else if(!sales_timestamp.match("[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]")){
                    res.status(400).json({
                        message:"Wrong date format",
                        info: "sales_timestamp must follow the pattern YYYY-MM-DD HH:MM:SS "
                    })
                }

                else {
                    Model.Sales.create({
                        sales_timestamp :sales_timestamp,
                        cbemv_amount:cbemv_amount,
                        cbcless_amount:cbcless_amount,
                        lv_amount:lv_amount,
                        lv_quantity:lv_quantity,
                        cash_amount:cash_amount,
                        fk_id_fridge:fk_id_fridge
                    })

                    .then(sale => res.status(200).json(sale))
                    .catch(error => res.status(400).json(error))

        
                }
            })
        })
                   
    }
        
}



exports.editSale =(req,res) => {

    const { sales_timestamp, cbemv_amount, cbcless_amount,lv_amount,lv_quantity,cash_amount} = req.body

    Model.Sales.findOne({
        where: {
            id_sale: req.params.id
        }
    })

    .then((sale) => {
        if (!sale) {
            return res.status(400).json({
                message: 'Sale does not exist',
            });
        }

        const editSaleSchema = Joi.object().keys({ 
            sales_timestamp : Joi.string(),
            cbemv_amount:Joi.number().allow(""),
            cbcless_amount:Joi.number().allow(""),
            lv_amount:Joi.number().allow(""),
            lv_quantity:Joi.number().allow(""),
            cash_amount:Joi.number().allow(""),
        })

        const result = editSaleSchema.validate(req.body)

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

        else if(!sales_timestamp.match("[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]")){
            res.status(400).json({
                message:"Wrong date format",
                info: "sales_timestamp must follow the pattern YYYY-MM-DD HH:MM:SS "
            })
        }
        
        else { 
            Model.Sales.update({
                sales_timestamp :sales_timestamp,
                cbemv_amount:cbemv_amount,
                cbcless_amount:cbcless_amount,
                lv_amount:lv_amount,
                lv_quantity:lv_quantity,
                cash_amount:cash_amount,
            },
            {
                where : {
                    id_sale: req.params.id
                }
            })
            .then(res.status(200).json({
                message: "Modification apply"})
            ) 
            .catch(error => console.log(error))
        }
    })
    
   

}



exports.deleteSale = (req,res) => {
    
    Model.Sales.findOne({
        where: {
            id_sale: req.params.id
        }
    })
    .then((sale) => {
        if (!sale) {
            return res.status(400).json({
                message: 'Sale does not exist',
            });
        }

        else {
            Model.Sales.destroy({
                where: {
                    id_sale: req.params.id
                }
            })
            .then(res.status(200).json({
                message :`Sale with id : ${req.params.id} has been deleted`})
            )   
            .catch(error => res.status(400).json(error))
        }

 
    })
    
}