const express = require('express')
const db = require('./db');
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Init')
})

db.sync({force: false})
.then(() => {
  app.listen(port);
});