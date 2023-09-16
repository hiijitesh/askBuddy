const {
	errorResponse,
	invalidFieldResponse,
	successResponse,
} = require("../../utils/errorHandler");
const { getQuestionById } = require("../questions/questionService");
const { voteQuestion, getVoteData } = require("./voteService");

const controllers = {
	questionUpvote: async (req, res) => {
		try {
			const { questionId } = req.body;
			const userId = req.userInfo.id;

			if (!questionId) {
				return invalidFieldResponse(res, "provide question id");
			}

			const question = await getQuestionById(questionId);
			if (!question) {
				return errorResponse(res, "Question doesn't exists");
			}

			if (userId.toString() === question.askedBy?.toString()) {
				return errorResponse(res, question, "You cannot vote own Question!");
			}

			const oldVoteObj = {
				voteUserId: userId,
				questionId,
				isUpvote: true,
				isQuestion: true,
			};
			const oldVote = await getVoteData(oldVoteObj);
			if (oldVote) {
				return errorResponse(
					res,
					oldVote,
					"you have already upvoted this Question!"
				);
			}

			const voteObject = {
				isUpvote: true,
				isDownvote: false,
				isQuestion: true,
				voteUserId: userId,
				questionId,
			};

			const upvote = await voteQuestion(voteObject);
			if (!upvote) {
				return errorResponse(res, question, "You cannot upvote Question");
			}

			return successResponse(res, upvote, "Question upvoted successfully");
		} catch (error) {
			console.error(error.message);
		}
	},

	questionDownVote: async (req, res) => {
		try {
			const { questionId } = req.body;
			const userId = req.userInfo.id;

			if (!questionId) {
				return invalidFieldResponse(res, "provide question id");
			}

			const question = await getQuestionById(questionId);
			if (!question) {
				return errorResponse(res, "Question doesn't exists");
			}

			if (userId.toString() === question.askedBy?.toString()) {
				return errorResponse(res, question, "You cannot vote own Question!");
			}

			const oldVoteObj = {
				voteUserId: userId,
				questionId,
				isUpvote: false,
				isDownvote: true,
				isQuestion: true,
			};
			const oldVote = await getVoteData(oldVoteObj);
			if (oldVote) {
				return errorResponse(
					res,
					oldVote,
					"you have been already downvoted this Question!"
				);
			}

			const voteObject = {
				isDownvote: true,
				isQuestion: true,
				voteUserId: userId,
				questionId,
			};
			const upvote = await voteQuestion(voteObject);
			if (!upvote) {
				return errorResponse(res, question, "You cannot downvote Question");
			}
			return successResponse(res, upvote, "Question downvoted successfully");
		} catch (error) {
			console.error(error.message);
		}
	},
};

module.exports = controllers;
