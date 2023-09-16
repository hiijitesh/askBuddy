const VoteModel = require("../../models/vote");

module.exports = {
	vote: async (object) => {
		try {
			return await VoteModel.create(object);
		} catch (error) {
			console.error(error.message);
		}
	},

	updateVote: async (updateObject) => {
		try {
			return await VoteModel.findOneAndReplace(updateObject);
		} catch (error) {
			console.error(error.message);
		}
	},

	getVoteData: async (object) => {
		try {
			return await VoteModel.findOne(object);
		} catch (error) {
			console.error(error.message);
		}
	},
};
