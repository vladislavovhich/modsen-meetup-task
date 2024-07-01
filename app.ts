import MeetupRoutes from "./src/routes/meetup.routes"
import TagRoutes from "./src/routes/tag.routes"
import AuthRoutes from "./src/routes/auth.routes"
import jwtStrategy from './src/config/passport'
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import passport from "passport"
import cookieParser from "cookie-parser"
import cors from "cors"
import swaggerUIPath from "swagger-ui-express"

const swaggerJson = require("./src/docs/swagger.json")

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
app.use('/api/docs', swaggerUIPath.serve, swaggerUIPath.setup(swaggerJson))

export default app
