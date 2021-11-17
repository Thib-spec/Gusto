const Model = require("../database/models");
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
                Id_user : req.params.id
            }
        })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json(error))
     
        
    }

    exports.addUser = (req,res) =>{
        const { firstname, lastname, email, password, image, user_language,fk_Id_level,fk_Id_client } = req.body;

        // Check general account fields
        if (!firstname || !lastname || !image || !email || !password || !user_language || !fk_Id_level || !fk_Id_client) {
            return res.status(400).json({
                message: 'Missing required parameters',
                info: 'Requires: firstname, lastname, image, email, password, user_language, fk_Id_level, fk_Id_client'
            })
        }

       // Check email format 
       if(!email.match("^.{1,}@[^.]{1,}")){
           return res.status(400).json({
               message: "Invalid format for email",
               info:"email must match following pattern : abc@gmail.com"
           })
       }

       Model.Users.create({
        firstname: firstname,
        lastname:lastname,
        email:email,
        password:password,
        image:image,
        user_language:user_language,
        fk_Id_client:fk_Id_client,
        fk_Id_level:fk_Id_level
    })

    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json(error))
        
}


exports.editUser = (req,res) => {
    const { firstname, lastname, email, password, image,user_language} = req.body;

    Model.Users.update({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                image:image,
                user_language:user_language
            },
            {
                where:{Id_user: req.params.id}
                
            })
    
    .then(res.send("Modification apply"))
    .catch(error => res.status(400).json(error))
}

exports.deleteUser = (req,res) => {
    
            Model.Users.findOne({
                where: {
                    Id_user: req.params.id
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
                            Id_user: req.params.id
                        }
                    }).then(() => res.send(`User with id : ${req.params.id} has been deleted`))
                }

            )
            .catch(error => res.status(400).json(error))
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
//       if (sessions.length) return true
//       else return false
//     } catch (err) {
//       throw err
//     }
//   }

// route put et delete login et logout


