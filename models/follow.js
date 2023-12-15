const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
    {
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Questions",
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
