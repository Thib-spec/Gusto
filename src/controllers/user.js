const { session } = require("passport");
const Model = require("../database/models");
const security = require("../helpers/security")
const Joi = require('joi');

// const Model = {
//     Users: require("../database/models/users")(),           // config pour que l'ide propose les fonctions possibles
// }

    exports.listUsers = (req, res) => {
        Model.Users.findAll({
            include:{all: true}
                
        })

        .then(user =>res.json(user))
        
           
        
        .catch(error => res.status(400).json(error))
    }

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
            }
        })
        .catch(error => res.status(400).json(error))
    }



    exports.addUser = (req,res) =>{
        const { firstname, lastname, email, image,password,fk_id_level,fk_id_client,fk_id_nationality } = req.body;

        const fk_level_list = new Array()
        const fk_client_list = new Array()

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
        image:Joi.string().required(),
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
        info: 'Requires: firstname, lastname, password, image, email, fk_id_level, fk_id_client, fk_id_nationality' 
      })
    }

    Model.Levels.findAll({
        attributes:["id_level"]
    })
    .then(allLevels => {
        Model.Levels.count()
        .then(numberOfLevel => {
            for(let i= 0;i<numberOfLevel;i++){
                fk_level_list.push(allLevels[i].id_level)
            }

            Model.Client.findAll({
                attributes:["id_client"]
            })
            .then(allClients => {
                Model.Client.count()
                .then(numberOfClient => {
                    for(let j= 0;j<numberOfClient;j++){
                        fk_client_list.push(allClients[j].id_client)
                    }

                    if(!fk_level_list.includes(fk_id_level)){
                        return res.status(400).json({
                            message:"fk_id_level does not match any id_level"
                        })
                    }

                    else if(!fk_client_list.includes(fk_id_client)){
                        return res.status(400).json({
                            message:"fk_id_client does not match any id_client"
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
    .catch(error => res.status(400).json(error))
}



exports.editUser = (req,res) => {
    const { firstname, lastname, email, image} = req.body;

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
            email: Joi.string().email(), 
            image:Joi.string(),
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
            Model.Users.update({
                firstname: firstname,
                lastname: lastname,
                email: email,
                image:image,
            },
            {
                where : {
                    id_user: req.params.id
                }
            })
            return res.send("Modification apply")
        }
    })
    
    .catch(error => console.log(error))
}
        

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
            Model.Users
                    .destroy({
                        where: {
                            id_user: req.params.id
                        }
                    }).then(() => res.send(`User with id : ${req.params.id} has been deleted`))
                }

            )
            .catch(error => res.status(400).json(error))
        }



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
                
                else if (security.bcryptCompareSync(password, user.password)){
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


        exports.logout = (req,res) =>{
            const user = req.user
            const sessions = user.session
            sessions.destroy()
            .then(res.status(200).json("User has been deconnected"))
            .catch(error => res.json(error))
        }

        // route /me renvoyer req.user






//   /**
//    * validate le password de l'user
//    * @param {string} password
//    * @returns {Boolean}
//    */
//   Users.prototype.isPasswordValid = function (password){
//     return security.bcryptCompareSync(password, this.password)
//   }

//   /**
//   * génère authToken en fonction de l'user
//   * 1. cree une session et la lie avec un jwt
//   * @returns {Promise<jwtToken>}
//   */
//   Users.prototype.genAuthToken = async function () {
//     try {
//       const session = await this.createSession()
//       return security.jwtGenTokenSync({
//         sub: this.id,
//         sessionId:session.id,
//         expiresIn: 3600, // en seconde
//       })
//     } catch (err) {
//       throw err
//     }
//   }

//   /**
//    * Valid un jwtPayload en fonction des sessions existantes
//    * @param {object} payload
//    * @returns {Boolean}
//    */
//   Users.prototype.isAuthTokenPayloadValid = async function (payload) {
//     try {
//       const sessions = await this.getSessions({where:{id:payload.sessionId}})
//       if (sesnsios.length) return true
//       else return false
//     } catch (err) {
//       throw err
//     }
//   }


