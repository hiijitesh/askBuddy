const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const questionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        body: {
            type: String,
            require: true,
        },
        tags: {
            type: [String],
            require: true,
            maxLength: 3,
        },
        askedBy: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "User",
        },
        voteCount: {
            type: Number,
            default: 0,
        },
        followCount: {
            type: Number,
            default: 0,
        },
        isAnswered: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

questionSchema.plugin(aggregatePaginate);

const QuestionModel = mongoose.model("Question", questionSchema);

module.exports = QuestionModel;
