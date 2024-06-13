const express = require('express');

const router = express.Router()
const controllers = require("../controllers/tags")

router.get("/:id", controllers.get)
router.get("/", controllers.getAll)
router.put("/:id", controllers.update)
router.post("/", controllers.create)
router.delete("/:id", controllers.delete)

module.exports = router