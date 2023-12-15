const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
    {
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Questions",
        },
        answerId: {
            type: mongoose.Types.ObjectId,
            ref: "Answer",
        },
        followerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        followCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const FollowModel = mongoose.model("Follow", followSchema);
module.exports = FollowModel;
