const express = require('express');

const middleware = require("../middleware/validation")
const schemas = require("../schemas")

const controllers = require("../controllers/meetups")
const router = express.Router()

router.get("/:id", middleware(schemas.query, 'params'), controllers.get)
router.get("/", controllers.getAll)
router.put("/:id", middleware(schemas.query, 'params'), middleware(schemas.meetup, 'body'), controllers.update)
router.post("/", middleware(schemas.meetup, 'body'), controllers.create)
router.delete("/:id", middleware(schemas.query, 'params'), controllers.delete)

module.exports = router