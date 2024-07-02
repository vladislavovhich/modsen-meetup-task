import db from "./src/config/db"
import Role from "./src/models/role"
import app from "./app"
import User from "./src/models/user"
import Tag from "./src/models/tag"
import Meetup from './src/models/meetup'
import "dotenv/config"

const PORT = process.env.NODE_DOCKER_PORT || 8080

db.sync({ force: false }).then(async () => {
    let roles: number = await Role.count()

    if (roles == 0) {
        await Role.bulkCreate([
            {name: "student"},
            {name: "mentor"}
        ])
    }
    
    app.listen(PORT)
})