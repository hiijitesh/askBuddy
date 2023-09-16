const { default: mongoose } = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    isUpvote: {
      type: Boolean,
      default: false,
    },
    isDownvote: {
      type: Boolean,
      default: false,
    },
    isQuestion: {
      type: Boolean,
      default: false,
    },
    isAnswer: {
      type: Boolean,
      default: false,
    },
    voteUserId: {
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
  },
  {
    timestamps: true,
  }
);

const VoteModel = mongoose.model("Votes", voteSchema);
module.exports = VoteModel;
