const { default: mongoose } = require("mongoose");
const { AnsModel } = require("../../models");

module.exports = {
	answerToQuestion: async (ans) => {
		try {
			return await AnsModel.create(ans);
		} catch (error) {
			console.error(error.message);
			return error;
		}
	},

	getAnswerById: async (ansId) => {
		try {
			return await AnsModel.findById(new mongoose.Types.ObjectId(ansId));
		} catch (error) {
			console.error(error.message);
			return error;
		}
	},

	getTotalAnswer: async (filter) => {
		try {
			return await AnsModel.find(filter);
		} catch (error) {
			console.error(error.message);
			return error;
		}
	},
	updateAnswer: async (ansId, updateData) => {
		try {
			return await AnsModel.findByIdAndUpdate(
				new mongoose.Types.ObjectId(ansId),
				updateData,
				{
					new: true,
				}
			);
		} catch (error) {
			console.error(error.message);
			return error;
		}
	},

	deleteAnswer: async (ansId) => {
		try {
			return await AnsModel.findOneAndRemove(
				new mongoose.Types.ObjectId(ansId)
			);
		} catch (error) {
			console.error(error.message);
			return error;
		}
	},
};
