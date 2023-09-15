const { default: mongoose } = require("mongoose");
const { AnsModel } = require("../../models");

module.exports = {
	answerToQuestion: async (ans) => {
		try {
			return await AnsModel.create(ans);
		} catch (error) {
			console.error(error.message);
		}
	},

	getAnswerById: async (ansId) => {
		try {
			return await AnsModel.findOne({ _id: ansId });
		} catch (error) {
			console.error(error.message);
		}
	},
	updateAnswer: async (ansId, updateData) => {
		try {
			return await AnsModel.findOneAndUpdate(ansId, updateData, { new: true });
		} catch (error) {
			console.error(error.message);
		}
	},

	deleteAnswer: async (ansId) => {
		try {
			return await AnsModel.findOneAndRemove(ansId);
		} catch (error) {
			console.error(error.message);
		}
	},
};
