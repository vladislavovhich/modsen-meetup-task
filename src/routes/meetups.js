const express = require('express');
const passport = require("passport")

const isValid = require("../middleware/validation")
const schemas = require("../config/schemas")
const Meetup = require("../models/meetup")

const controllers = require("../controllers/meetups")
const {checkRole, ownsResource} = require("../middleware/user")

const router = express.Router()

router.get("/:id", isValid(schemas.query, 'params'), controllers.get)

router.get("/", isValid(schemas.meetupAllQuery, 'query'), controllers.getAll)

router.put("/:id", 
    passport.authenticate('jwt', { session: false }), 
    checkRole([2]),
    isValid(schemas.query, 'params'), 
    isValid(schemas.meetup, 'body'), 
    ownsResource(Meetup),
    controllers.update)

router.post("/", 
    passport.authenticate('jwt', { session: false }), 
    checkRole([2]),
    isValid(schemas.meetup, 'body'), 
    controllers.create)

router.delete("/:id", 
    passport.authenticate('jwt', { session: false }), 
    checkRole([2]),
    isValid(schemas.query, 'params'), 
    ownsResource(Meetup),
    controllers.delete)

module.exports = router