const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer()
const express = require('express')

const app = express()
const port = 3000
const db = require('./db')

const meetupRoutes = require('./routes/meetup');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(upload.array());

app.use('/', meetupRoutes);

db.sync({force: false})
.then(() => {
  app.listen(port)
})