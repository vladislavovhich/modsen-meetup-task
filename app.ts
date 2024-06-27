import express, { Application } from 'express'
import bodyParser from 'body-parser'
import passport from "passport"
import cookieParser from "cookie-parser"
import cors from "cors"

const swaggerUIPath = require("swagger-ui-express");
const swaggerjsonFilePath = require("./src/docs/swagger.json");

import jwtStrategy from './src/config/passport'
import db from "./src/config/db"
import Role from "./src/models/role"
import User from "./src/models/user"
import Tag from "./src/models/tag"
import Meetup from './src/models/meetup'

import MeetupRoutes from "./src/routes/meetup.routes"
import TagRoutes from "./src/routes/tag.routes"
import AuthRoutes from "./src/routes/auth.routes"

const app: Application = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

passport.use(jwtStrategy)
app.use(passport.initialize())

app.use('/api/meetups', MeetupRoutes)
app.use('/api/tags', TagRoutes)
app.use('/api/auth', AuthRoutes)
app.use('/api/docs', swaggerUIPath.serve, swaggerUIPath.setup(swaggerjsonFilePath))

db.sync({ force: false }).then(async () => {
    let roles: number = await Role.count()

    if (roles == 0) {
        await Role.bulkCreate([
            {name: "student"},
            {name: "mentor"}
        ])
    }
    
    app.listen(3000)
})