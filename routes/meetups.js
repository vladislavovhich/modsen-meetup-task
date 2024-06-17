const express = require('express');
const passport = require("passport")

const middleware = require("../middleware/validation")
const schemas = require("../schemas")

const controllers = require("../controllers/meetups")
const router = express.Router()

router.get("/:id", middleware(schemas.query, 'params'), controllers.get)

router.get("/", middleware(schemas.meetupAllQuery, 'query'), controllers.getAll)

router.put("/:id", 
    passport.authenticate('jwt', { session: false }), 
    middleware(schemas.query, 'params'), 
    middleware(schemas.meetup, 'body'), 
    controllers.update)

router.post("/", 
    passport.authenticate('jwt', { session: false }), 
    middleware(schemas.meetup, 'body'), 
    controllers.create)

router.delete("/:id", 
    passport.authenticate('jwt', { session: false }), 
    middleware(schemas.query, 'params'), 
    controllers.delete)

module.exports = router