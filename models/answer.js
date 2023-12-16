const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

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
        followCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

answerSchema.plugin(aggregatePaginate);

const AnsModel = mongoose.model("Answer", answerSchema);
module.exports = AnsModel;
