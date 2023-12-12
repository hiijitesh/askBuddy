const { QuestionModel, AnsModel } = require("../../models");
const VoteModel = require("../../models/vote");

module.exports = {
    createVote: async (object) => {
        try {
            return await VoteModel.create(object);
        } catch (error) {
            console.error(error.message);
            return error;
        }
    },

    updateVote: async (updateObject, vote) => {
        try {
            // console.log(updateObject);
            const data = await VoteModel.findOneAndUpdate(
                updateObject,
                {
                    $set: {
                        upvote: vote,
                    },
                },
                { upsert: true, new: true }
            );

            if (data) {
                if (updateObject.questionId) {
                    await QuestionModel.findOneAndUpdate(
                        { _id: updateObject.questionId },
                        {
                            $inc: { voteCount: vote === true ? 1 : -1 },
                        },
                        { new: true }
                    );
                } else {
                    await AnsModel.findOneAndUpdate(
                        { _id: updateObject.answerId },
                        {
                            $inc: { voteCount: vote === true ? 1 : -1 },
                        },
                        { new: true }
                    );
                }
            }

            return data;
        } catch (error) {
            console.error(error.message);
            return error;
        }
    },

    getVoteData: async (object) => {
        try {
            return await VoteModel.findOne(object);
        } catch (error) {
            console.error(error.message);
            return error;
        }
    },
};
