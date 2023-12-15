const { default: mongoose } = require("mongoose");

const voteSchema = new mongoose.Schema(
    {
        upvote: {
            type: Boolean,
            default: false,
        },
        voterId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        questionId: {
            type: mongoose.Types.ObjectId,
            ref: "Question",
        },
        answerId: {
            type: mongoose.Types.ObjectId,
            ref: "Answer",
        },
        commentId: {
            type: mongoose.Types.ObjectId,
            ref: "Comment",
        },
    },
    {
        timestamps: true,
    }
);

const VoteModel = mongoose.model("Votes", voteSchema);
module.exports = VoteModel;
