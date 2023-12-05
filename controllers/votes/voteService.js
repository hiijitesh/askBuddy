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
            return await VoteModel.findOneAndUpdate(
                updateObject,
                {
                    $set: {
                        upvote: vote,
                    },
                },
                {
                    new: true,
                }
            );
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
