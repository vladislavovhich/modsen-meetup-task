const express = require('express');

const middleware = require("../middleware/validation")
const schemas = require("../schemas")

const router = express.Router()
const controllers = require("../controllers/tags")

router.get("/:id", middleware(schemas.query, 'params'), controllers.get)
router.get("/", controllers.getAll)
router.put("/:id", middleware(schemas.query, 'params'), middleware(schemas.tag, 'body'), controllers.update)
router.post("/", middleware(schemas.tag, 'body'), controllers.create)
router.delete("/:id", middleware(schemas.query, 'params'), controllers.delete)

module.exports = router