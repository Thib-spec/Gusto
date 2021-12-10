const Model = require("../database/models");
const Joi = require('joi');


    exports.listBadges = (req, res) => {
        Model.Badges.findAll()
        .then(badges => res.status(200).json(badges))
        .catch(error => res.status(400).json(error))
    }


    exports.getBadgeById = (req,res) => {
        Model.Badges.findOne({
            where:{
                id_badges: req.params.id
            }
        })
        .then((badge) => {
            if (!badge) {
                return res.status(400).json({
                    message: 'Badge does not exist',
                });
            }
    
            else {
                return res.status(200).json(badge)
            }
        })
        .catch(error => res.json(error))
     
        
    }

    exports.addBadge = (req,res) =>{
        const {id_badges, fk_id_client, fk_id_user} = req.body;

        const list_fk_client = new Array()
        const list_fk_user = new Array()
    
       const postBadgeSchema = Joi.object().keys({ 
            id_badges: Joi.string().required(),
            fk_id_client:Joi.number().required(),
            fk_id_user:Joi.number().required()

        })

        const result = postBadgeSchema.validate(req.body)

        const {error } = result;

        const valid = error == null;

        if (!valid) {
            res.status(400).json({ 
                message: 'Missing required parameters',
                info: 'Requires: id_badges, fk_id_client, fk_id_user' 
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

                    Model.Users.findAll()
                    .then(allUsers => {
                        Model.Users.count()
                        .then(numberOfUser => {
                            for(let i=0;i<numberOfUser;i++){
                                list_fk_user.push(allUsers[i].id_user)
                            }

                            if(!list_fk_user.includes(fk_id_user)){
                                res.status(400).json({
                                    message:"fk_id_user does not match any id_user"
                                })
                            }
                            
                            else if(!list_fk_client.includes(fk_id_client)){
                                res.status(400).json({
                                    message: "fk_id_client does not match any id_client"
                                })
                            }

                            else {
                                Model.Badges.create({
                                    id_badges: id_badges.toUpperCase(),
                                    fk_id_client: fk_id_client,
                                    fk_id_user: fk_id_user
                                })
            
                                .then(badge => res.status(200).json(badge))
                                .catch(error => res.status(400).json(error))
                            }
                        })
                    })
                })
            })

          
        } 
    }


    exports.editBadge = (req,res) => {
        const {fk_id_client,fk_id_user} = req.body;

        const list_fk_client = new Array()
        const list_fk_user = new Array()

        Model.Badges.findOne({
            where: {
                id_badges: req.params.id
            }
        })

        .then((badge) => {
            if (!badge) {
                return res.status(400).json({
                    message: 'Badge not found',
                });
            }

            const editBadgeSchema = Joi.object().keys({ 
                fk_id_client:Joi.number(),
                fk_id_user:Joi.number()
            })

            const result = editBadgeSchema.validate(req.body)

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
                
                Model.Client.findAll()
                .then(allClient => {
                    Model.Client.count()
                    .then(numberOfClient => {
                        for(let i =0;i<numberOfClient;i++){
                            list_fk_client.push(allClient[i].id_client)
                        }
    
                        Model.Users.findAll()
                        .then(allUsers => {
                            Model.Users.count()
                            .then(numberOfUser => {
                                for(let i=0;i<numberOfUser;i++){
                                    list_fk_user.push(allUsers[i].id_user)
                                }
    
                                if(!list_fk_user.includes(fk_id_user)){
                                    res.status(400).json({
                                        message:"fk_id_user does not match any id_user"
                                    })
                                }
                                
                                else if(!list_fk_client.includes(fk_id_client)){
                                    res.status(400).json({
                                        message: "fk_id_client does not match any id_client"
                                    })
                                }

                                else {
                                    Model.Badges.update({
                                        fk_id_client:fk_id_client,
                                        fk_id_user:fk_id_user
                                    },
                                    {
                                        where : {
                                            id_badges: req.params.id
                                        }
                                    })
                                    res.status(200).json({
                                        message: "Item has been updated"
                                    })
                                }
                            })
                        })
                    })
                })
            }
        }) .catch(error => res.status(400).json(error))
        
        
    }
        

exports.deleteBadge = (req,res) => {
    
    Model.Badges.findOne({
        where: {
            id_badges: req.params.id
        }
    })
    .then((badge) => {
        if (!badge) {
            return res.status(400).json({
                message: 'Badge not found',
            });
        }
        Model.Badges.destroy({
                where: {
                    id_badges: req.params.id
                }
            })
            res.status(200).json({
                message : `Badge with id : ${req.params.id} has been deleted`
            })
        })

    
    .catch(error => res.status(400).json(error))
}
