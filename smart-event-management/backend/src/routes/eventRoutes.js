const express = require("express");
const eventController = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { ROLES } = require("../config/constants");
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
    roleMiddleware(ROLES.ORGANIZER, ROLES.ADMIN),
    createEventValidator,
    validateMiddleware,
    eventController.createEvent
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware(ROLES.ORGANIZER, ROLES.ADMIN),
    updateEventValidator,
    validateMiddleware,
    eventController.updateEvent
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(ROLES.ORGANIZER, ROLES.ADMIN),
    eventController.deleteEvent
);

module.exports = router;