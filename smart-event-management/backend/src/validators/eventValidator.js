const { body } = require("express-validator");

const createEventValidator = [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("description").trim().notEmpty().withMessage("Description is required"),
    body("venue").trim().notEmpty().withMessage("Venue is required"),
    body("eventDate").notEmpty().withMessage("Event date is required"),
    body("startTime").trim().notEmpty().withMessage("Start time is required"),
    body("endTime").trim().notEmpty().withMessage("End time is required"),
    body("capacity")
        .isInt({ min: 1 })
        .withMessage("Capacity must be at least 1")
];

const updateEventValidator = [
    body("title").optional().trim().notEmpty().withMessage("Title cannot be empty"),
    body("description").optional().trim().notEmpty().withMessage("Description cannot be empty"),
    body("venue").optional().trim().notEmpty().withMessage("Venue cannot be empty"),
    body("capacity")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Capacity must be at least 1")
];

module.exports = {
    createEventValidator,
    updateEventValidator
};