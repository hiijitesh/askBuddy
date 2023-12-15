const mongoose = require("mongoose");

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
        commenterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        // for reply on comment
        commentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const commentModel = mongoose.model("comment", commentSchema);
module.exports = commentModel;
