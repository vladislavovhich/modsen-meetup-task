const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer()
const express = require('express')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(upload.array())

app.use('/api/meetups', require('./routes/meetups'));
app.use('/api/tags', require('./routes/tags'));

module.exports = app