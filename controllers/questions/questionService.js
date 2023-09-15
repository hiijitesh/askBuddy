const { default: mongoose } = require("mongoose");
const QuestionModel = require("../../models/question");

module.exports = {
	createQuestion: async (question) => {
		try {
			return await QuestionModel.create(question);
		} catch (error) {
			console.error(error.message);
		}
	},

	getQuestionById: async (questionId) => {
		try {
			return await QuestionModel.findOne(questionId);
		} catch (error) {
			console.error(error.message);
		}
	},

	updateQuestion: async (questionId, updatedQuestion) => {
		try {
			return await QuestionModel.findOneAndUpdate(
				new mongoose.Types.ObjectId(questionId),
				updatedQuestion,
				{
					new: true,
				}
			);
		} catch (error) {
			console.error(error.message);
		}
	},

	deleteQuestion: async (questionId) => {
		try {
			return await QuestionModel.findOneAndDelete(
				new mongoose.Types.ObjectId(questionId),
				{ new: true }
			);
		} catch (error) {
			console.error(error.message);
		}
	},
};
