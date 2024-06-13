const express = require('express');

const controllers = require("../controllers/meetups")
const router = express.Router()

router.get("/:id", controllers.get)
router.get("/", controllers.getAll)
router.put("/:id", controllers.update)
router.post("/", controllers.create)
router.delete("/:id", controllers.delete)

module.exports = router