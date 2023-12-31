const { default: mongoose } = require("mongoose");
const {
    invalidFieldResponse,
    errorResponse,
    successResponse,
    forbiddenResponse,
} = require("../../utils/errorHandler");

const {
    createQuestion,
    editQuestion,
    getQuestionById,
    getAllQuestions,
    AllQuestions,
    removeQuestion,
} = require("./questionService");

const controllers = {
    askQuestion: async (req, res) => {
        try {
            const { title, body, tags } = req.body;
            const askedBy = req.user.id;
            if (!askedBy) {
                return invalidFieldResponse(res, {}, "Not valid user");
            }

            if (!title || !body || !tags?.length < 0) {
                return invalidFieldResponse(res, {}, "all filed are mandatory");
            }
            const questionData = {
                title,
                body,
                askedBy,
                tags,
            };

            const question = await createQuestion(questionData);
            if (!question) {
                return errorResponse(
                    res,
                    {},
                    "couldn't add question please try again!"
                );
            }
            return successResponse(
                res,
                { question },
                "Your Question was added"
            );
        } catch (error) {
            console.error(error);
            return errorResponse(res, {}, "something went wrong!");
        }
    },

    getQuestionById: async (req, res) => {
        try {
            const questionId = req.params;
            if (!questionId) {
                return invalidFieldResponse(res, "provide questionId");
            }

            const question = await getQuestionById(questionId);
            if (!question) {
                return errorResponse(
                    res,
                    {},
                    "Question you are looking for doesn't exits!"
                );
            }

            return successResponse(res, question, "Question founds");
        } catch (error) {
            console.error(error);
            return errorResponse(res, {}, "something went wrong!");
        }
    },

    updateQuestion: async (req, res) => {
        try {
            const { questionId, title, body, tags } = req.body;
            const userId = req.user.id;

            if (!questionId) {
                return invalidFieldResponse(
                    res,
                    {},
                    "please provide questionId!"
                );
            }

            const questionInfo = await getQuestionById(questionId);
            if (!questionInfo) {
                return errorResponse(res, "Question Doesn't exits!");
            }
            if (userId.toString() !== questionInfo.askedBy.toString()) {
                return forbiddenResponse(
                    res,
                    questionInfo.title,
                    "you are not authorized to edit this question"
                );
            }

            const questionData = {
                title,
                body,
                tags,
            };

            const question = await editQuestion(questionId, questionData);
            if (!question) {
                return errorResponse(res, {}, "something went wrong!");
            }

            return successResponse(
                res,
                question,
                "question updated successfully!"
            );
        } catch (error) {
            console.error(error);
            return errorResponse(res, {}, "something went wrong!");
        }
    },

    deleteQuestion: async (req, res) => {
        try {
            const { questionId } = req.body;
            const userId = req.user.id;

            const questionInfo = await getQuestionById(questionId);
            if (!questionInfo) {
                return errorResponse(res, "Question Doesn't exits!");
            }
            if (userId.toString() !== questionInfo.askedBy.toString()) {
                return forbiddenResponse(
                    res,
                    questionInfo.title,
                    "you are not authorized to delete this question"
                );
            }

            const removedQuestion = await removeQuestion(questionId);
            if (!removedQuestion) {
                return errorResponse(
                    res,
                    {},
                    "something went wrong, pleas try again!"
                );
            }

            return successResponse(
                res,
                removedQuestion,
                "Your question was deleted!"
            );
        } catch (error) {
            console.error(error);
            return errorResponse(res, {}, "something went wrong!");
        }
    },

    getUserQuestions: async (req, res) => {
        try {
            const userId = req.user.id;

            if (!userId) {
                return invalidFieldResponse(
                    res,
                    {},
                    "Please use token so that We can get your user id"
                );
            }

            const questions = await getAllQuestions({ askedBy: userId });
            if (!questions) {
                return errorResponse(res, {}, "questions  doesn't exists");
            }

            return successResponse(
                res,
                questions,
                "All questions found successfully"
            );
        } catch (error) {
            console.error(error);
            return errorResponse(res, {}, "something went wrong!");
        }
    },

    getallQuestions: async (req, res) => {
        try {
            const { pageNum, pageSize, tags } = req.body;
            const userId = req.user.id;

            if (!userId) {
                return invalidFieldResponse(
                    res,
                    {},
                    "Please use token so that We can get your user id"
                );
            }
            const questionAgg = [
                {
                    $match: {
                        tags: { $in: tags },
                    },
                },

                {
                    $lookup: {
                        from: "follows",
                        let: { id: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $eq: ["$questionId", "$$id"],
                                            },
                                            {
                                                $eq: [
                                                    "$followerId",
                                                    new mongoose.Types.ObjectId(
                                                        userId
                                                    ),
                                                ],
                                            },
                                        ],
                                    },
                                },
                            },
                        ],
                        as: "followData",
                    },
                },
                {
                    $addFields: {
                        isFollowing: {
                            $cond: {
                                if: {
                                    $eq: [
                                        { $ifNull: ["$followData", "false"] },
                                        "false",
                                    ],
                                },
                                then: false,
                                else: true,
                            },
                        },
                    },
                },

                {
                    $lookup: {
                        from: "votes",
                        let: { id: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $eq: ["$questionId", "$$id"],
                                            },
                                            {
                                                $eq: [
                                                    "$voterId",
                                                    new mongoose.Types.ObjectId(
                                                        userId
                                                    ),
                                                ],
                                            },
                                        ],
                                    },
                                    upvote: true,
                                },
                            },
                        ],
                        as: "voteData",
                    },
                },
                {
                    $addFields: {
                        isVoted: {
                            $cond: {
                                if: {
                                    $eq: [
                                        { $ifNull: ["$voteData", "false"] },
                                        "false",
                                    ],
                                },
                                then: true,
                                else: false,
                            },
                        },
                    },
                },

                {
                    $unset: ["voteData"],
                },
            ];

            const options = {
                page: pageNum || 1,
                limit: pageSize || 10,
                sort: { _id: -1 },
                collation: {
                    locale: "en",
                },
            };

            const questions = await AllQuestions(questionAgg, options);
            if (!questions) {
                return errorResponse(res, {}, "questions  doesn't exists");
            }

            return successResponse(
                res,
                questions,
                "All questions found successfully"
            );
        } catch (error) {
            console.error(error);
            return errorResponse(res, {}, "something went wrong!");
        }
    },
};

module.exports = controllers;
