const { session } = require("passport");
const Model = require("../database/models");
const security = require("../helpers/security")
const Joi = require('joi');
// const Model = {
//     Users: require("../database/models/users")(),           // config pour que l'ide propose les fonctions possibles
// }

    exports.listUsers = (req, res) => {
        Model.Users.findAll()
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json(error))
    }


    exports.getUserById = (req,res) => {
        Model.Users.findOne({
            where:{
                id_user : req.params.id
            }
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

    exports.addUser = (req,res) =>{
        const { firstname, lastname, email, image,password, user_language,fk_id_level,fk_id_client } = req.body;

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
        email:Joi.string().email().required(), 
        image:Joi.string().required(),
        user_language:Joi.string().required(),
        fk_id_client:Joi.required(),
        fk_id_level:Joi.required()
    })

    const result = postUserSchema.validate(req.body)

    const {error } = result;

    const valid = error == null;

    if (!valid) {
      res.status(400).json({ 
        message: 'Missing required parameters',
        info: 'Requires: firstname, lastname, password, image, email, user_language, fk_id_level, fk_id_client' 
      })
    }

   

    else {

       Model.Users.create({
        firstname: firstname,
        lastname:lastname,
        email:email,
        image:image,
        password:password,
        user_language:user_language,
        fk_id_client:fk_id_client,
        fk_id_level:fk_id_level
    })
    
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json(error))
    }
}


exports.editUser = (req,res) => {
    const { firstname, lastname, email, image,user_language} = req.body;

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
            user_language:Joi.string()
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
                user_language:user_language
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
                }
            }).then((user) => {
                console.log
                if (!user) {
                    console.log("azerty")
                    const test = security.bcryptCompareSync(password, "fsdgfs")
                    console.log(test)
                    return res.status(400).json({
                        message: 'User not found',
                    })
                }
                
                else if (security.bcryptCompareSync(password, user.password)){
                    console.log("ok")
                    user.createSession()
                    .then(session=> {
                        console.log(session)
                        const token = security.jwtGenTokenSync({
                        sub: user.id_user,
                        sessionId:session.id_session,
                        expiresIn: 3600, // en seconde
                        })

                        res.status(200).json({user,token})
                        res.send("complete")
                    })
                    .catch(error => console.log(error))
                }

                else{
                    console.log("ok1")
                    console.log(error)
                }
            })
            .catch(error => console.log(error))
               
        }


        exports.logout = (req,res) =>{
            console.log("os")
            const user = req.user
            const sessions = user.session
            sessions.destroy()
            .then(vgh => res.send("OK"))
            .catch(error => console.log(error))
        }






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


