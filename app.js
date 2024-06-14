const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer()
const express = require('express')
const swaggerUIPath= require("swagger-ui-express");
const swaggerjsonFilePath = require("./docs/swagger.json");

const app = express()
const db = require("./db")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(upload.array())

app.use('/api/docs', swaggerUIPath.serve, swaggerUIPath.setup(swaggerjsonFilePath))
app.use('/api/meetups', require('./routes/meetups'));
app.use('/api/tags', require('./routes/tags'));

db.sync({ force: false }).then(() => app.listen(3000))