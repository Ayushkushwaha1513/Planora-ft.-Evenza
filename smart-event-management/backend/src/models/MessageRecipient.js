const mongoose = require("mongoose");

const messageRecipientSchema = new mongoose.Schema(
    {
        messageId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            required: true,
            index: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        readAt: {
            type: Date,
            default: null
        },
        isArchived: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

messageRecipientSchema.index({ messageId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("MessageRecipient", messageRecipientSchema);

