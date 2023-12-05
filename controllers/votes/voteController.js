const {
    errorResponse,
    invalidFieldResponse,
    successResponse,
} = require("../../utils/errorHandler");

const { getQuestionById } = require("../questions/questionService");
const { getAnswerById } = require("../answers/answerService");

const { getVoteData, updateVote } = require("./voteService");

const controllers = {
    questionVote: async (req, res) => {
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
                return errorResponse(
                    res,
                    question,
                    "You cannot vote own Question!"
                );
            }
            const oldVoteObj = {
                voterId: userId,
                questionId,
            };

            const oldVote = await getVoteData(oldVoteObj);
            const vote = oldVote ? !oldVote.upvote : true;

            const voteObject = {
                voterId: userId,
                questionId,
            };

            const upvote = await updateVote(voteObject, vote);

            return successResponse(res, upvote, "Question voted successfully");
        } catch (error) {
            console.error(error.message);
            return errorResponse(res, {}, "You cannot vote Question");
        }
    },

    answerVote: async (req, res) => {
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
                return errorResponse(
                    res,
                    answer,
                    "You cannot vote own Answer!"
                );
            }
            const voteObject = {
                voterId: userId,
                answerId: ansId,
            };

            const oldVoteObj = {
                voterId: userId,
                answerId: ansId,
            };

            const oldVote = await getVoteData(oldVoteObj);
            const vote = oldVote ? !oldVote.upvote : true;

            const upvote = await updateVote(voteObject, vote);
            return successResponse(res, upvote, "Answer voted successfully");
        } catch (error) {
            console.error(error.message);
            return errorResponse(res, {}, "You cannot upvote Answer");
        }
    },
};

module.exports = controllers;
