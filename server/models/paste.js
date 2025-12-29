import mongoose from "mongoose";

const pasteSchema = new mongoose.Schema({
    pasteId: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
    },
    remainingViews: {
        type: Number,
    },
}, {
    timestamps: true
});

export default mongoose.model("Paste", pasteSchema);
