const app = require('./app')
const db = require('./db')

db.sync({force: false})
.then(() => {
  app.listen(3000)
})