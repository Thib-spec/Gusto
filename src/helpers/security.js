// modules
const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken')

/**
 * hash le string async
 * @param {string} string
 * @param {integer} nb_round_salt
 * @returns {Promise<String>}
 */
module.exports.bcryptHash = function(string, nb_round_salt=parseInt(process.env.NB_ROUND_SALT)){
    return new Promise((resolve,reject)=>{
        bcrypt.genSalt(nb_round_salt)
        .then(salt=>{
            return resolve(bcrypt.hash(string,salt))
        })
        .catch(err=>{
            return reject(err)
        })
    })
}

/**
 * hash le string sync
 * @param {string} string
 * @param {integer} nb_round_salt
 * @returns {String}
 */
module.exports.bcryptHashSync = function(string, nb_round_salt=parseInt(process.env.NB_ROUND_SALT)){
    const salt = bcrypt.genSaltSync(nb_round_salt)
    return bcrypt.hashSync(string,salt)
}

/**
 * compare le string et le hash sync
 * @param {string} string
 * @param {integer} hashedString
 * @returns {Boolean}
 */
module.exports.bcryptCompareSync = function(string,hashedString){
    return bcrypt.compareSync(string,hashedString)
}

/**
 * compare le string et le hash async
 * @param {string} string
 * @param {integer} hashedString
 * @returns {Promise<Boolean>}
 */
module.exports.bcryptCompare = function(string,hashedString){
    return bcrypt.compare(string,hashedString)
}

// -------------------------------------------------- //

/**
 * génère un jwt token sync
 * @param {object} payload
 * @param {object} options
 * @param {string} secret_key
 * @returns {jwtToken}
 */
module.exports.jwtGenTokenSync = function (payload,options={},secret_key=process.env.JWT_SECRET_KEY) {
    const token = jwt.sign(
        payload,
        secret_key,
        options,
            // dans options
        // {
        //     expiresIn: maxAge/1000, // en seconde
        // },
            // ou dans payload
        //exp: Math.floor(expiration_date/1000),
    )
    return token
}

/**
 * verify la validité d'un token jwt async
 * @param {jwtToken} token
 * @param {string} secret_key
 * @returns {Promise<Object>}
 */
module.exports.jwtVerifyToken = function (token, secret_key = process.env.JWT_SECRET_KEY) {
    return new Promise((resolve,reject)=>{
        jwt.verify(token, secret_key, (err, payload)=>{
            if (err) return reject(err)
            else return resolve(payload)
        })
    })
}

/**
 * retourne le token décodé avec .payload et .header
 * @param {jwtToken} token
 * @returns {Object}
 */
module.exports.jwtDecodeToken = function (token) {
    const decodedToken = jwt.decode(token, {complete: true})
    return decodedToken
}