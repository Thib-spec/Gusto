const Model = require("../database/models");
const Joi = require('joi');

// const Model = {
//     Categories: require("../database/models/categories")(),           // config pour que l'ide propose les fonctions possibles
// }

exports.listCategories = (req, res) => {
    Model.Categories.findAll()
    .then(category => res.status(200).json(category))
    .catch(error => res.status(400).json(error))
}

exports.getCategoryById = (req,res) => {
    Model.Categories.findOne({
        where:{
            id_category : req.params.id
        }
    })
    .then((category) => {
        if (!category) {
            return res.status(400).json({
                message: 'Category does not exist',
            });
        }

        else {
            return res.status(200).json(category)
        }
    })
    .catch(error => res.json(error))
 
    
}



exports.addCategory = (req,res) =>{
    const { label, image, description} = req.body

    console.log(req.body.label)
        
        Model.Categories.create({
        label : label,
        image:image,
        description:description
    })

    .then(category => {
        console.log(category)
        res.status(200).json(category)})
    .catch(error => res.status(400).json(error))
}
