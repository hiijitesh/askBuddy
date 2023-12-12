const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Questions",
        },
        answeredBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        voteCount: {
            type: Number,
            default: 0,
        },
        isAccepted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const AnsModel = mongoose.model("Answer", answerSchema);
module.exports = AnsModel;
