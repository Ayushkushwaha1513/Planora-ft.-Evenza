const mongoose = require("mongoose");

const volunteerProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true
        },
        preferredRoles: {
            type: [String],
            default: []
        },
        skills: {
            type: [String],
            default: []
        },
        availableSlots: {
            type: [String],
            default: []
        },
        experienceLevel: {
            type: String,
            trim: true
        },
        emergencyContactName: {
            type: String,
            trim: true
        },
        emergencyContactPhone: {
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

module.exports = mongoose.model("VolunteerProfile", volunteerProfileSchema);

