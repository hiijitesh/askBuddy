const VoteModel = require("../../models/vote");

module.exports = {
	createVote: async (object) => {
		try {
			return await VoteModel.create(object);
		} catch (error) {
			console.error(error.message);
		}
	},

	updateVote: async (id, updateObject) => {
		try {
			return await VoteModel.findOneAndReplace(id, updateObject, {
				upsert: true,
				new: true,
			});
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
