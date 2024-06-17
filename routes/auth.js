const express = require('express');
const passport = require("passport")

const middleware = require("../middleware/validation")
const schemas = require("../schemas")

const router = express.Router()
const controllers = require("../controllers/auth")

router.post("/login", controllers.login)
router.post("/register", controllers.register)
router.get("/logout", passport.authenticate('jwt', { session: false }), controllers.logout)

module.exports = router