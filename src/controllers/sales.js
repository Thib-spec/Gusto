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
    const {cbemv_amount, cbcless_amount,lv_amount,lv_quantity,cash_amount, fk_id_fridge} = req.body

    let list_fk_fridge = []
    let today = new Date()
    let todayFormat = ("0" + today.getDate()).slice(-2) + "-" + ("0"+(today.getMonth()+1)).slice(-2) + "-" +today.getFullYear() + " " + ("0" + today.getHours()).slice(-2) + ":" + ("0" + today.getMinutes()).slice(-2) + ":" +("0" + today.getSeconds()).slice(-2)

    const postSalesSchema = Joi.object().keys({ 
        cbemv_amount:Joi.number().required(),
        cbcless_amount:Joi.number().required(),
        lv_amount:Joi.number().required(),
        lv_quantity:Joi.number().required(),
        cash_amount:Joi.number().required(),
        fk_id_fridge: Joi.string().required()
        
    })

    const result = postSalesSchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    if (!valid) {
        return res.status(400).json({ 
            message: 'Missing required parameters',
            info: 'Requires: cbemv_amount, cbcless_amount,lv_amount,lv_quantity,cash_amount, fk_id_fridge'
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

                else {
                    Model.Sales.create({
                        sales_timestamp :todayFormat,
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

exports.addProductInSale = (req,res) => {
    const {fk_id_product,quantity_product} = req.body
    

    let list_fk_product = []
    let list_product_sales = []
   
    const postProductToSaleSchema = Joi.object().keys({ 
        fk_id_product : Joi.number().required(),
        quantity_product:Joi.number().required()
    })

    const result = postProductToSaleSchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    if (!valid) {
      res.status(400).json({ 
        message: 'Missing required parameters',
        info: 'Requires: fk_id_product, quantity_product' 
      })
    }

    else {

        Model.Products.findAll()
        .then(allproduct => {
            Model.Products.count()
            .then(numberOfProduct => {
                for(let i=0;i<numberOfProduct;i++){
                    list_fk_product.push(allproduct[i].id_product)
                }

                if(!list_fk_product.includes(fk_id_product)){
                    return res.status(400).json({
                        message: "fk_id_product does not match any id_product"
                    })
                }

                

                else {
                    Model.Sales.findOne({
                        where:{
                            id_sale:req.params.id
                        }
                    })
                    .then(sale => {
                        if(!sale){
                            return res.status(400).json({
                                message: 'Sale does not exist'
                            })
                        }

                        else {
                            sale.getProducts()
                            .then(product_sale => {
                                for(let i=0;i<product_sale.length;i++){
                                    list_product_sales.push(product_sale[i].id_product)
                                }
                                

                                if(list_product_sales.includes(fk_id_product)){
                                    return res.status(400).json({
                                        message:`Product ${fk_id_product}  has already been assigned to Sale ${req.params.id} `
                                    }) 
                                }
                                

                                else {
                                    Model.products_sales.create({
                                        fk_id_product:fk_id_product,
                                        fk_id_sale:req.params.id,
                                        quantity_product:quantity_product

                                    })
                                    .then(product => res.status(200).json(product))
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