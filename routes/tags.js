const express = require('express');
const passport = require("passport")

const middleware = require("../middleware/validation")
const schemas = require("../schemas")

const router = express.Router()
const controllers = require("../controllers/tags")

router.get("/:id", middleware(schemas.query, 'params'), controllers.get)

router.get("/", controllers.getAll)

router.put("/:id", 
    passport.authenticate('jwt', { session: false }), 
    middleware(schemas.query, 'params'), 
    middleware(schemas.tag, 'body'), 
    controllers.update)

router.post("/", 
    passport.authenticate('jwt', { session: false }),
    middleware(schemas.tag, 'body'), 
    controllers.create)

router.delete("/:id", 
    passport.authenticate('jwt', { session: false }),
    middleware(schemas.query, 'params'), controllers.delete)

module.exports = router