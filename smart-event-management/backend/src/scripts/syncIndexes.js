require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");

async function main() {
    await connectDB();

    // Register all models (schema definitions + indexes).
    const models = [
        require("../models/User"),
        require("../models/Event"),
        require("../models/Registration"),
        require("../models/VolunteerProfile"),
        require("../models/VolunteerAssignment"),
        require("../models/Attendance"),
        require("../models/Feedback"),
        require("../models/Message"),
        require("../models/MessageRecipient"),
        require("../models/Certificate"),
        require("../models/Notification"),
        require("../models/AuditLog")
    ];

    for (const model of models) {
        // Ensures MongoDB builds indexes as defined in schemas.
        // Note: for very large collections this can take time.
        await model.syncIndexes();
    }

    await mongoose.disconnect();
    console.log("Index sync complete.");
}

main().catch(async (err) => {
    console.error("Index sync failed:", err);
    try {
        await mongoose.disconnect();
    } catch {
        // ignore
    }
    process.exit(1);
});

