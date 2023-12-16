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
        isFollow: {
            type: Boolean,
            require: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const FollowModel = mongoose.model("Follow", followSchema);
module.exports = FollowModel;
