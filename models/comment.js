const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const commentSchema = new mongoose.Schema(
    {
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Questions",
        },
        comment: {
            type: String,
            require: true,
        },
        answerId: {
            type: mongoose.Types.ObjectId,
            ref: "Answer",
        },
        username: {
            type: String,
            require: true,
        },
        commenterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        // for reply on comment
        commentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
        voteCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

commentSchema.plugin(aggregatePaginate);

const CommentModel = mongoose.model("Comment", commentSchema);
module.exports = CommentModel;
