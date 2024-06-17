const express = require('express');
const passport = require("passport")

const isValid = require("../middleware/validation")
const schemas = require("../schemas")

const router = express.Router()
const controllers = require("../controllers/tags")
const {checkRole, ownsResource} = require("../middleware/user")
const Tag = require("../models/tag")

router.get("/:id", isValid(schemas.query, 'params'), controllers.get)

router.get("/", controllers.getAll)

router.put("/:id", 
    passport.authenticate('jwt', { session: false }), 
    checkRole([2]),
    isValid(schemas.query, 'params'), 
    isValid(schemas.tag, 'body'), 
    ownsResource(Tag),
    controllers.update)

router.post("/", 
    passport.authenticate('jwt', { session: false }),
    checkRole([2]),
    isValid(schemas.tag, 'body'), 
    controllers.create)

router.delete("/:id", 
    passport.authenticate('jwt', { session: false }),
    checkRole([2]),
    ownsResource(Tag),
    isValid(schemas.query, 'params'), controllers.delete)

module.exports = router