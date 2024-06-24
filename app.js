const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer()
const express = require('express')
const swaggerUIPath= require("swagger-ui-express");
const swaggerjsonFilePath = require("./src/docs/swagger.json");
const jwtStrategy = require("./src/config/passport")
const passport = require("passport")
const cookieParser = require("cookie-parser")
const cors = require('cors')

const db = require("./src/config/db")
const Role = require("./src/models/role")
const User = require("./src/models/user")
const Tag = require("./src/models/tag")
const Meetup = require("./src/models/meetup")

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(upload.array())

passport.use(jwtStrategy)
app.use(passport.initialize())

app.use('/api/meetups', require('./src/routes/meetups'))
app.use('/api/tags', require('./src/routes/tags'))
app.use('/api/auth', require('./src/routes/auth'))
app.use('/api/docs', swaggerUIPath.serve, swaggerUIPath.setup(swaggerjsonFilePath))

db.sync({ force: false }).then(async () => {
    let roles = await Role.count()

    if (roles == 0) {
        await Role.bulkCreate([
            {name: "student"},
            {name: "mentor"}
        ])
    }
    
    app.listen(3000)
})