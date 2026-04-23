const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
    {
        actorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            index: true
        },
        action: {
            type: String,
            required: true,
            index: true
        },
        entityType: {
            type: String,
            required: true,
            index: true
        },
        entityId: {
            type: mongoose.Schema.Types.ObjectId,
            index: true
        },
        meta: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);

