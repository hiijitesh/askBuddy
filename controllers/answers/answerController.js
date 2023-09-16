const { default: mongoose } = require("mongoose");
const {
	errorResponse,
	invalidFieldResponse,
	successResponse,
	forbiddenResponse,
} = require("../../utils/errorHandler");
const { getQuestionById } = require("../questions/questionService");
const {
	answerToQuestion,
	getAnswerById,
	updateAnswer,
	deleteAnswer,
	getTotalAnswer,
} = require("./answerService");

const controllers = {
	addAnswer: async (req, res) => {
		try {
			const { questionId, description } = req.body;
			const userId = req.userInfo.id;

			if (!description) {
				return invalidFieldResponse(res, "please provide answer description!");
			}
			if (!questionId) {
				return invalidFieldResponse(res, "please provide questionId!");
			}

			// user cant ans to own question
			const question = await getQuestionById(
				new mongoose.Types.ObjectId(questionId)
			);
			if (question.askedBy === userId) {
				return errorResponse(res, "You can't answer your own question!");
			}

			const ansData = {
				description,
				questionId,
				answeredBy: userId,
			};
			const answer = await answerToQuestion(ansData);
			if (!answer) {
				return errorResponse(res, {}, "couldn't add answer, try again!");
			}

			return successResponse(res, answer, "You answer posted");
		} catch (error) {
			console.error(error.message);
		}
	},

	getAnswer: async (req, res) => {
		try {
			const { ansId } = req.params;
			const answer = await getAnswerById(ansId);
			if (!answer) {
				return errorResponse(res, {}, "answer doesn't exits");
			}

			return successResponse(res, answer, "answer found");
		} catch (error) {
			console.error(error.message);
		}
	},

	AllAnswer: async (req, res) => {
		try {
			const { questionId } = req.body;

			if (!questionId) {
				return invalidFieldResponse(res, "no question Id found");
			}

			const filter = {};
			filter.questionId = new mongoose.Types.ObjectId(questionId);
			filter.isAccepted = false;

			const totalAnswer = await getTotalAnswer(filter);
			if (!totalAnswer) {
				return errorResponse(res, "answer doesn't exits");
			}

			return successResponse(res, totalAnswer, "ans found");
		} catch (error) {
			console.error(error.message);
		}
	},

	editAnswer: async (req, res) => {
		try {
			const { ansId, description } = req.body;
			const userId = req.userInfo.id;

			if (!ansId) {
				return invalidFieldResponse(res, "please provide answerId");
			}
			if (!description) {
				return invalidFieldResponse(res, "please provide answer description");
			}

			const answer = await getAnswerById(ansId);
			if (answer.answeredBy.toString() !== userId.toString()) {
				return forbiddenResponse(
					res,
					"you are not authorized to edit this answer"
				);
			}

			const updateData = {
				description,
			};
			const ans = await updateAnswer(
				{ _id: new mongoose.Types.ObjectId(ansId) },
				updateData
			);
			if (!updateAnswer) {
				return errorResponse(res, "couldn't update answer");
			}

			return successResponse(res, ans, "answer updated successfully");
		} catch (error) {
			console.error(error.message);
		}
	},

	removeAnswer: async (req, res) => {
		try {
			const { ansId } = req.body;
			const userId = req.userInfo.id;

			if (!ansId) {
				return invalidFieldResponse(res, "please provide answerId");
			}

			const answer = await getAnswerById(ansId);
			if (answer.answeredBy.toString() !== userId.toString()) {
				return forbiddenResponse(
					res,
					"you are not authorized to delete this answer"
				);
			}
			const deletedAnsData = await deleteAnswer(ansId);
			if (!deletedAnsData) {
				return errorResponse(res, {}, "couldn't delete answer");
			}

			return successResponse(
				res,
				deletedAnsData,
				"Answer deleted successfully"
			);
		} catch (error) {
			console.error(error.message);
		}
	},
};

module.exports = controllers;
