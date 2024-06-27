import { Strategy } from "passport-jwt"
import User from "../models/user"
import { Request } from "express"

const cookieExtractor = (req: Request) => {
    let jwt = null 

    if (req && req.cookies) {
        jwt = req.cookies['jwt']
    }

    return jwt
}

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: "secret",
};

const jwtStrategy = new Strategy(opts, async (payload, done) => {
    try {
        const user = User.findOne({
            where: {id: payload.id}
        })

        if (user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
      } catch (error) {
          return done(error);
    }
})

export default jwtStrategy