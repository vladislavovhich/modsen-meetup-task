const express = require('express');
const passport = require("passport")

const isValid = require("../middleware/validation")
const schemas = require("../config/schemas")

const router = express.Router()
const controllers = require("../controllers/auth")

router.post("/login", 
    isValid(schemas.login, 'body'), 
    controllers.login)

router.post("/register", 
    isValid(schemas.register, 'body'), 
    controllers.register)

router.get("/logout", passport.authenticate('jwt', { session: false }), controllers.logout)

router.get("/refresh",  passport.authenticate('jwt', { session: false }), controllers.refreshToken)

module.exports = router