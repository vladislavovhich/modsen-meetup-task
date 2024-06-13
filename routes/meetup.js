const express = require('express');
const meetupController = require("../controllers/meetup")

const router = express.Router()

router.get("/meetup/:id", meetupController.get)
router.get("/meetup", meetupController.getAll)
router.put("/meetup/:id", meetupController.update)
router.post("/meetup", meetupController.create)
router.delete("/meetup/:id", meetupController.delete)

module.exports = router