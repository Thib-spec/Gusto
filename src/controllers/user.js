const Model = require("../database/models");
const security = require("../helpers/security")
const Joi = require('joi');

    // Retourne l'ensemble des utilisateurs

    exports.listUsers = (req, res) => {
        Model.Users.findAll({
            include:{all: true}
                
        })
        .then(user =>res.json(user))
        .catch(error => res.status(400).json(error))
    }

    // Renvoi les utilisateurs selon le level spécifié

    exports.listUserByLevel = (req, res) => {
        Model.Levels.findOne({
            where:{
                label : req.params.label
            }
        })

        .then((level) => {
            if (!level) {
                return res.status(400).json({
                    message: 'Level does not exist',
                });
            }
    
            else {
                Model.Users.findAll({
                    where:{
                        fk_id_level: level.id_level
                    }
                })
                    .then(user => res.status(200).json(user))
                    .catch(error => res.status(400).json(error))
            }
        })
        .catch(error => res.json(error))
     
        
    }

    // Récupère un utilisateur par son id

    exports.getUserById = (req,res) => {
        Model.Users.findOne({
            where:{
                id_user : req.params.id
            },
            include:{all: true}
            
        })
        .then((user) => {
            if (!user) {
                return res.status(400).json({
                    message: 'User not found',
                });
            }

            else {
                return res.status(200).json(user)
            }
        })
        .catch(error => res.status(400).json(error))
    }

    // Retourne la nationalité d'un utilisateur

    exports.getUserNationality = (req,res) =>{
        Model.Users.findOne({
            where:{
                id_user:req.params.id
            }
        })

        .then((user) => {
            if (!user) {
                return res.status(400).json({
                    message: 'User not found',
                });
            }

            else {
                Model.Nationalities.findOne({
                    where:{
                        id_nationality:user.fk_id_nationality
                    }
                })

                .then(nationality => res.status(200).json(nationality))
                .catch(error => res.status(400).json(error))
            }
        })
        
    }

    // Ajoute un utilisateur

    exports.addUser = (req,res) =>{
        const { firstname, lastname, email, image,password,fk_id_level,fk_id_client,fk_id_nationality } = req.body;

        let fk_level_list = []
        let fk_client_list = []
        let fk_nationality_list = []

        let email_list = []

       // Check email format 
       if(!email.match("^.{1,}@[^.]{1,}")){
           return res.status(400).json({
               message: "Invalid format for email",
               info:"email must match following pattern : abc@gmail.com"
           })
       }

       const postUserSchema = Joi.object().keys({ 
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        password: Joi.string().required(),
        email:Joi.string().required(), 
        image:Joi.string(),
        fk_id_client:Joi.number().required(),
        fk_id_level:Joi.number().required(),
        fk_id_nationality: Joi.number().required()
    })

    const result = postUserSchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    if (!valid) {
      res.status(400).json({ 
        message: 'Missing required parameters',
        info: 'Requires: firstname, lastname, password, email, fk_id_level, fk_id_client, fk_id_nationality' 
      })
    }

    Model.Levels.findAll()
    .then(allLevels => {
        Model.Levels.count()
        .then(numberOfLevel => {
            for(let i= 0;i<numberOfLevel;i++){
                fk_level_list.push(allLevels[i].id_level)
            }

            Model.Client.findAll()
            .then(allClients => {
                Model.Client.count()
                .then(numberOfClient => {
                    for(let j= 0;j<numberOfClient;j++){
                        fk_client_list.push(allClients[j].id_client)
                    }

                    Model.Nationalities.findAll()
                    .then(allNationalities => {
                        Model.Nationalities.count()
                        .then(numberOfNationalities => {
                            for(let i =0;i<numberOfNationalities;i++){
                                fk_nationality_list.push(allNationalities[i].id_nationality)
                            }

                            Model.Users.findAll()
                            .then(allUser => {
                                Model.Users.count()
                                .then(numberOfUser => {
                                    for(let i =0;i<numberOfUser;i++){
                                        email_list.push(allUser[i].email.toLowerCase())
                                    }

                                    if(email_list.includes(email.toLowerCase())){
                                        res.status(400).json({
                                            message:"Email is already taken"
                                        })
                                    }

                                    else if(!fk_level_list.includes(fk_id_level)){
                                        return res.status(400).json({
                                            message:"fk_id_level does not match any id_level"
                                        })
                                    }
                
                                    else if(!fk_client_list.includes(fk_id_client)){
                                        return res.status(400).json({
                                            message:"fk_id_client does not match any id_client"
                                        })
                                    }
        
                                    else if (!fk_nationality_list.includes(fk_id_nationality)){
                                        res.status(400).json({
                                            message: "fk_id_nationality does not match any id_nationality"
                                        })
                                    }
                
                                    else {
                                        Model.Users.create({
                                            firstname: firstname,
                                            lastname:lastname,
                                            email:email,
                                            image:image,
                                            password:password,
                                            fk_id_client:fk_id_client,
                                            fk_id_level:fk_id_level,
                                            fk_id_nationality:fk_id_nationality
                                        })
                                        
                                        .then(user => res.status(200).json(user))
                
                                    }
                                })
                            })

                        
                        })
                    })
                })
            })
        })
    })     
    .catch(error => res.status(400).json(error))
}


// Modifie un utilisateur

exports.editUser = (req,res) => {
    const { firstname, lastname, email, image, fk_id_level, fk_id_nationality} = req.body;
    let email_list = []
    let fk_nationality_list = []
    let fk_level_list = []


    Model.Users.findOne({
        where: {
            id_user: req.params.id
        }
    })

    .then((user) => {
        if (!user) {
            return res.status(400).json({
                message: 'User not found',
            });
        }

        const editUserSchema = Joi.object().keys({ 
            firstname: Joi.string(),
            lastname: Joi.string(),
            email: Joi.string(), 
            image:Joi.string(),
            fk_id_level:Joi.number(),
            fk_id_nationality:Joi.number()
        })

        const result = editUserSchema.validate(req.body)

        const {error } = result; 
        const valid = error == null;

        if (!valid) { 
          res.status(400).json({ 
            message: 'One or more fields are not well written', 
          }) 
        }
        

        else {
            Model.Users.findAll()
            .then(alluser => {
                Model.Users.count()
                .then(numberOfUser => {
                    for(let i =0;i<numberOfUser;i++){
                        email_list.push(alluser[i].email)
                    }
                    Model.Levels.findAll()
                    .then(allLevels => {
                        Model.Levels.count()
                        .then(numberOfLevel => {
                            for(let i= 0;i<numberOfLevel;i++){
                                fk_level_list.push(allLevels[i].id_level)
                            }
                            Model.Nationalities.findAll()
                            .then(allNationalities => {
                                Model.Nationalities.count()
                                .then(numberOfNationalities => {
                                    for(let i =0;i<numberOfNationalities;i++){
                                        fk_nationality_list.push(allNationalities[i].id_nationality)
                                    }

                                    if(!fk_level_list.includes(fk_id_level)){
                                        return res.status(400).json({
                                            message:"fk_id_level does not match any id_level"
                                        })
                                    }

                                    else if (!fk_nationality_list.includes(fk_id_nationality)){
                                       return  res.status(400).json({
                                            message: "fk_id_nationality does not match any id_nationality"
                                        })
                                    }
        



                                    if(email_list.includes(email)){
                                        return res.status(400).json({
                                            message:"Email is already taken"
                                        })
                                    }

                                    else if(Object.keys(req.body).length == 0){
                                        return res.status(400).json({
                                            message:"No parameters were passed"
                                        })
                                    }

                                    else if(!email.match("^.{1,}@[^.]{1,}")){
                                        return res.status(400).json({
                                            message: "Invalid format for email",
                                            info:"email must match following pattern : abc@gmail.com"
                                        })
                                    }

                                    else {
                                        Model.Users.update({
                                            firstname: firstname,
                                            lastname: lastname,
                                            email: email,
                                            image:image,
                                            fk_id_level:fk_id_level,
                                            fk_id_nationality:fk_id_nationality
                                        },
                                        {
                                            where : {
                                                id_user: req.params.id
                                            }
                                        })
                                        res.status(200).json({
                                            message:"Item has been updated"
                                        })
                                        
                                    }
                                })
                            })
                            .catch(error => console.log(error))
                        })
                    })
                })
            })
        }
    })
    
    
}
        
// Supprime un utilisateur

exports.deleteUser = (req,res) => {
    
    Model.Users.findOne({
        where: {
            id_user: req.params.id
        }
    })
    .then((user) => {
        if (!user) {
            return res.status(400).json({
                message: 'User not found',
            });
        }

        else {
            Model.Users.destroy({
                where: {
                    id_user: req.params.id
                }
            })
            .then(res.status(200).json({
                message: `User with id : ${req.params.id} has been deleted`})
            )
        }

    })
    .catch(error => res.status(400).json(error))

}
           
// Autehntifie un utilisateur

exports.login = (req,res) => {
    const { email,password} = req.body

    Model.Users.findOne({
        where:{
            email:email,
        },
        include:{all: true}
    })
    .then((user) => {
        if (!user) {
            return res.status(400).json({
                message: 'User not found',
            })
        }
        
        else if (security.bcryptCompareSync(password, user.password)){ // on vérifie que le mot de passe correspond bien à celui entré dans le corps de la requête puis on créé une session
            user.createSession()
            .then(session=> {

                const token = security.jwtGenTokenSync({
                sub: user.id_user,
                sessionId:session.id_session,
                expiresIn: 3600, // en seconde
                })

                res.status(200).json({...JSON.parse(JSON.stringify(user)),token})
            })
            .catch(error => console.log(error))
        }

        else{
            res.status(400).json("password or email is incorrect")
        }
    })
    .catch(error => console.log(error))
        
}

// Déonnecte un utilisateur

exports.logout = (req,res) =>{
    const user = req.user
    const sessions = user.session
    sessions.destroy()
    .then(res.status(200).json("User has been deconnected"))
    .catch(error => res.json(error))
}


// Permet d'accéder aux informations de l'utilisateur connecté

exports.userInfo = (req,res) => {
    Model.Users.findOne({
        include:{all:true},
        where:{
            id_user:req.user.id_user
        }
    })
    .then(user =>  res.status(200).json(user))
    
}