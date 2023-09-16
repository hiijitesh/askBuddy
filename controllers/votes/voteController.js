const {
	errorResponse,
	invalidFieldResponse,
	successResponse,
} = require("../../utils/errorHandler");

const { getQuestionById } = require("../questions/questionService");
const { getAnswerById } = require("../answers/answerService");

const { createVote, getVoteData, updateVote } = require("./voteService");
const { default: mongoose } = require("mongoose");

const controllers = {
	questionUpvote: async (req, res) => {
		try {
			const { questionId } = req.body;
			const userId = req.user.id;

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
			const voteObject = {
				isUpvote: true,
				isDownvote: false,
				isQuestion: true,
				voteUserId: userId,
				questionId,
			};

			const oldVoteObj = {
				voteUserId: userId,
				questionId,
				isQuestion: true,
			};
			const oldVote = await getVoteData(oldVoteObj);
			if (oldVote) {
				const vote = await updateVote(
					new mongoose.Types.ObjectId(userId.toString()),
					voteObject
				);
				return successResponse(
					res,
					vote,
					"upvote was updated to this Question!"
				);
			}

			const upvote = await createVote(voteObject);
			if (!upvote) {
				return errorResponse(res, question, "You cannot upvote Question");
			}

			return successResponse(res, upvote, "Question upvoted successfully");
		} catch (error) {
			console.error(error.message);
			return error;
		}
	},

	questionDownVote: async (req, res) => {
		try {
			const { questionId } = req.body;
			const userId = req.user.id;

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
			const voteObject = {
				isDownvote: true,
				isUpvote: false,
				isQuestion: true,
				voteUserId: userId,
				questionId,
			};

			const oldVoteObj = {
				voteUserId: userId,
				questionId,
				isQuestion: true,
			};
			const oldVote = await getVoteData(oldVoteObj);
			if (oldVote) {
				const vote = await updateVote(
					new mongoose.Types.ObjectId(userId.toString()),
					voteObject
				);
				return successResponse(
					res,
					vote,
					"downvote was updated to this Question!"
				);
			}

			const upvote = await createVote(voteObject);
			if (!upvote) {
				return errorResponse(res, question, "You cannot downvote Question");
			}
			return successResponse(res, upvote, "Question downvoted successfully");
		} catch (error) {
			console.error(error.message);
			return error;
		}
	},

	ansUpVote: async (req, res) => {
		try {
			const { ansId } = req.body;
			const userId = req.user.id;

			if (!ansId) {
				return invalidFieldResponse(res, "provide all fields");
			}

			const answer = await getAnswerById(ansId);
			if (!answer) {
				return errorResponse(res, "answer doesn't exists");
			}

			if (userId.toString() === answer.answeredBy?.toString()) {
				return errorResponse(res, answer, "You cannot vote own Answer!");
			}
			const voteObject = {
				voteUserId: userId,
				ansId,
				isUpvote: true,
				isDownvote: false,
				isAnswer: true,
			};

			const oldVoteObj = {
				voteUserId: userId,
				ansId,
				isAnswer: true,
			};
			const oldVote = await getVoteData(oldVoteObj);
			if (oldVote) {
				const vote = await updateVote({ _id: oldVote._id }, voteObject);
				return successResponse(res, vote, "upvote was updated to this Answer!");
			}

			const upvote = await createVote(voteObject);
			if (!upvote) {
				return errorResponse(res, answer, "You cannot upvote Answer");
			}
			return successResponse(res, upvote, "Answer upvoted successfully");
		} catch (error) {
			console.error(error.message);
			return error;
		}
	},

	answerDownVote: async (req, res) => {
		try {
			const { ansId } = req.body;
			const userId = req.user.id;

			if (!ansId) {
				return invalidFieldResponse(res, "provide all fields");
			}

			const answer = await getAnswerById(ansId);
			if (!answer) {
				return errorResponse(res, "answer doesn't exists");
			}

			if (userId.toString() === answer.answeredBy?.toString()) {
				return errorResponse(res, answer, "You cannot vote own Answer!");
			}
			const voteObject = {
				voteUserId: userId,
				ansId,
				isUpvote: false,
				isDownvote: true,
				isAnswer: true,
			};

			const oldVoteObj = {
				voteUserId: userId,
				ansId,
				isAnswer: true,
			};
			const oldVote = await getVoteData(oldVoteObj);
			if (oldVote) {
				const vote = await updateVote({ _id: oldVote._id }, voteObject);
				return successResponse(
					res,
					vote,
					"downvote was updated to this Answer!"
				);
			}

			const downvote = await createVote(voteObject);
			if (!downvote) {
				return errorResponse(res, downvote, "couldn't downvote the Answer");
			}

			return successResponse(res, downvote, "Answer downvoted Successfully!");
		} catch (error) {
			console.error(error);
			return error;
		}
	},
};

module.exports = controllers;
