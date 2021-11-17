const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    userModel=require('../../database/models').User

	async function isAuthTokenPayloadValid(user,payload) {
		try {
		  const sessions = await user.getSessions({where:{Id_session:payload.sessionId}})
		  if (sessions.length) return true
		  else return false
		} catch (err) {
		  throw err
		}
	  }

module.exports = ({passport, models})=>{

    let opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET_KEY
    }

	passport.use(new JwtStrategy(opts, async (jwtPayload, done) =>{
		console.log("test")
		/*
		jwt de la forme :
		{
			sub : matches the person who requested the token
			exp : (Expiration Time) Claim
			nbf : (Not Before) Claim
			iat : (Issued At) Claim
		}
		*/

		/* ----- Code -----
			
			ici faire vérification etc,
			trouver utilisateur dans bdd,
			etc.

			si tout ok : retourner "done(null,user)"
			si erreur : retourner "done(null,false)"

			voir http://www.passportjs.org/packages/passport-jwt/ pur plus d'info

		*/
		 

		try{
			const user= await models.Users.findOne({where:{Id_user: jwtPayload.sub}})
			if (user) {
				const isValid = await isAuthTokenPayloadValid(user,jwtPayload)
				if (isValid){
					const session = (await user.getSessions({where:{Id_session:jwtPayload.sessionId}}))[0]
					if (session){
						user.session = session
						return done(null,user)
					}
					else{
						return done(null, false)
					}
				}
				else{return done(null,false)}
			} else {
				return done(null, false)
			}
	
		} catch(err){done(err,false)}
		
	}))
}
