const Model = require("../database/models");
const Joi = require('joi');


    exports.listLevels = (req, res) => {
        Model.Levels.findAll()
        .then(level => res.status(200).json(level))
        .catch(error => res.status(400).json(error))
    }

    exports.addLevels = (req,res) =>{
        const {label} = req.body;
        let list_label = []

       const postLevelSchema = Joi.object().keys({ 
            label: Joi.string().required()
        })

        const result = postLevelSchema.validate(req.body)

        const {error } = result;

        const valid = error == null;

        if (!valid) {
            res.status(400).json({ 
                message: 'Missing required parameters',
                info: 'Requires: label' 
            })
        }

    

        else {

            Model.Levels.findAll()
            .then(allLevels => {
                Model.Levels.count()
                .then(numberofLevel => {
                    for(let i =0;i<numberofLevel;i++){
                        list_label.push(allLevels[i].label)
                    }

                    if(list_label.includes(label)){
                        res.status(400).json({
                            message:"This label already exists"
                        })
                    }

                    else {

                        Model.Levels.create({
                            label: label
                        })
                        
                        .then(level => res.status(200).json(level))
                        .catch(error => res.status(400).json(error))
                    }
                    
                })
            })
        }

      
}


exports.editLevels = (req,res) => {
    const {label} = req.body;

    Model.Levels.findOne({
        where: {
            id_level: req.params.id
        }
    })

    .then((level) => {
        if (!level) {
            return res.status(400).json({
                message: 'Level not found',
            });
        }

        const editLevelSchema = Joi.object().keys({ 
            label: Joi.string()
        })

        const result = editLevelSchema.validate(req.body)

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
            Model.Levels.update({
                label: label
            },
            {
                where : {
                    id_level: req.params.id
                }
            })
            res.status(200).json({
                message: "Item has been updated"
            })
        }
    })
    
    .catch(error => res.status(400).json(error))
}
        

exports.deleteLevels = (req,res) => {
    
    Model.Levels.findOne({
        where: {
            id_level: req.params.id
        }
    })
    .then((level) => {
        if (!level) {
            return res.status(400).json({
                message: 'Level not found',
            });
        }
        Model.Levels.destroy({
                where: {
                    id_level: req.params.id
                }
            })
            res.status(200).json({
                message : `Level with id : ${req.params.id} has been deleted`
            })
        })

    
    .catch(error => res.status(400).json(error))
}
