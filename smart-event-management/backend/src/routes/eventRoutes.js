const express = require("express");
const eventController = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");
const validateMiddleware = require("../middleware/validateMiddleware");
const {
    createEventValidator,
    updateEventValidator
} = require("../validators/eventValidator");

const router = express.Router();

router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);

router.post(
    "/",
    authMiddleware,
    createEventValidator,
    validateMiddleware,
    eventController.createEvent
);

router.put(
    "/:id",
    authMiddleware,
    updateEventValidator,
    validateMiddleware,
    eventController.updateEvent
);

router.delete("/:id", authMiddleware, eventController.deleteEvent);

module.exports = router;