const { default: mongoose } = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

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

voteSchema.plugin(aggregatePaginate);

const VoteModel = mongoose.model("Votes", voteSchema);
module.exports = VoteModel;
