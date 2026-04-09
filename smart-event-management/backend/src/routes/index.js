const express = require("express");
const authRoutes = require("./authRoutes");
const eventRoutes = require("./eventRoutes");

const router = express.Router();

router.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API health is good"
    });
});

router.use("/auth", authRoutes);
router.use("/events", eventRoutes);

module.exports = router;