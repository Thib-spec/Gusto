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


exports.listProductsBySales = (req,res) => {
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
                Model.Sales.findOne({
                    where:{
                        id_sale:req.params.id
                    },
                    include:{model:Model.Products}
                })
    
                .then(sales =>{
                    if (!sales) {
                        return res.status(400).json({
                            message: 'Sale does not exist',
                        });
                    }
    
                    else {
                        res.status(200).json(sales)
                    }
                })

            }
        })
    })

    .catch(error => res.json(error))       
}


exports.addSale = (req,res) =>{
    const { sales_timestamp, cbemv_amount, cbcless_amount,lv_amount,lv_quantity,cash_amount,fk_id_fridge} = req.body

    const postSalesSchema = Joi.object().keys({ 
        sales_timestamp : Joi.string().required(),
        cbemv_amount:Joi.number().required(),
        cbcless_amount:Joi.number().required(),
        lv_amount:Joi.number().required(),
        lv_quantity:Joi.number().required(),
        cash_amount:Joi.number().required(),
        fk_id_fridge:Joi.number().required()
        
    })

    const result = postSalesSchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    if (!valid) {
      res.status(400).json({ 
        message: 'Missing required parameters',
        info: 'Requires: sales_timestamp, cbemv_amount, cbcless_amount,lv_amount,lv_quantity,cash_amount,fk_id_fridge' 
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
        
}



exports.editSale =(req,res) => {

    const { sales_timestamp, cbemv_amount, cbcless_amount,lv_amount,lv_quantity,cash_amount,fk_id_fridge} = req.body

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
            cbemv_amount:Joi.number(),
            cbcless_amount:Joi.number(),
            lv_amount:Joi.number(),
            lv_quantity:Joi.number(),
            cash_amount:Joi.number(),
            fk_id_fridge:Joi.number()
        })

        const result = editSaleSchema.validate(req.body)

        const {error } = result; 
        const valid = error == null; 

        if (!valid) { 
          res.status(400).json({ 
            message: 'One or more fields are not well written', 
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
                fk_id_fridge:fk_id_fridge
            },
            {
                where : {
                    id_sale: req.params.id
                }
            })
            .then(res.send("Modification apply"))
        }
    })
    
    .catch(error => console.log(error))

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
    Model.Sales
            .destroy({
                where: {
                    id_sale: req.params.id
                }
            }).then(res.send(`Sale with id : ${req.params.id} has been deleted`))
        }

    )
    .catch(error => res.status(400).json(error))
}