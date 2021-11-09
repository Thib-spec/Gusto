const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    userModel=require('../../database/models').User

module.exports = ({passport, models})=>{

    let opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET_KEY
    }

	passport.use(new JwtStrategy(opts, async (jwtPayload, done) =>{
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
			const user= await models.User.findOne({where:{id: jwtPayload.sub}})
			if (user) {
				const isValid = await user.isAuthTokenPayloadValid(jwtPayload)
				if (isValid){
					const session = (await user.getSessions({where:{id:jwtPayload.sessionId}}))[0]
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
