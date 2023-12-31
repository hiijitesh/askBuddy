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
            // console.log(question);
            if (userId.toString() === question.askedBy?.toString()) {
                return errorResponse(
                    res,
                    question,
                    "You cannot vote own Question!"
                );
            }
            const voteObject = {
                voterId: userId,
                questionId,
            };

            // console.log(oldVoteObj);

            const oldVote = await getVoteData(voteObject);
            const vote = oldVote ? !oldVote.upvote : true;

            const voteData = await updateVote(voteObject, vote);

            const voteType = voteData.upvote ? "downvoted" : "upvoted";

            return successResponse(
                res,
                voteData,
                `Question ${voteType} successfully`
            );
        } catch (error) {
            console.error(error);
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
            // console.log(answer);
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

            const oldVote = await getVoteData(voteObject);
            // console.log(oldVote);
            const vote = oldVote ? !oldVote.upvote : true;

            const voteData = await updateVote(voteObject, vote);
            const voteType = voteData.upvote ? "downvoted" : "upvoted";
            return successResponse(
                res,
                voteData,
                `Answer ${voteType} successfully`
            );
        } catch (error) {
            console.error(error);
            return errorResponse(res, {}, "You cannot upvote Answer");
        }
    },
};

module.exports = controllers;
