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

	updateVote: async (id, updateObject) => {
		try {
			return await VoteModel.findOneAndUpdate(id, updateObject, {
				new: true,
			});
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
