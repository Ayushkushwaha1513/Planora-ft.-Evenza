const mongoose = require("mongoose");

const volunteerAssignmentSchema = new mongoose.Schema(
    {
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true,
            index: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        slotId: {
            type: String,
            default: null
        },
        role: {
            type: String,
            trim: true,
            required: true
        },
        assignedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        assignmentStatus: {
            type: String,
            enum: ["assigned", "accepted", "completed", "cancelled"],
            default: "assigned",
            index: true
        },
        instructions: {
            type: String,
            trim: true
        },
        isDeleted: {
            type: Boolean,
            default: false,
            index: true
        }
    },
    { timestamps: true }
);

volunteerAssignmentSchema.index({ eventId: 1, userId: 1, slotId: 1 }, { unique: true });
volunteerAssignmentSchema.index({ userId: 1, assignmentStatus: 1 });

module.exports = mongoose.model("VolunteerAssignment", volunteerAssignmentSchema);

