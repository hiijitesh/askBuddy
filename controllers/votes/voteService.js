const VoteModel = require("../../models/vote");

module.exports = {
	voteQuestion: async (object) => {
		try {
			return await VoteModel.create(object);
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
