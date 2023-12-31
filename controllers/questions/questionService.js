const { default: mongoose } = require("mongoose");
const QuestionModel = require("../../models/question");

module.exports = {
    createQuestion: async (question) => {
        try {
            return await QuestionModel.create(question);
        } catch (error) {
            console.error(error.message);
            return error;
        }
    },

    getQuestionById: async (questionId) => {
        try {
            return await QuestionModel.findById(
                new mongoose.Types.ObjectId(questionId)
            );
        } catch (error) {
            console.error(error.message);
            return error;
        }
    },

    editQuestion: async (questionId, updatedQuestion) => {
        try {
            return await QuestionModel.findByIdAndUpdate(
                new mongoose.Types.ObjectId(questionId),
                updatedQuestion,
                {
                    new: true,
                }
            );
        } catch (error) {
            console.error(error.message);
            return error;
        }
    },

    removeQuestion: async (questionId) => {
        try {
            return await QuestionModel.findByIdAndDelete(
                new mongoose.Types.ObjectId(questionId),
                { new: true }
            );
        } catch (error) {
            console.error(error.message);
            return error;
        }
    },
    getAllQuestions: async (askedBy) => {
        try {
            return await QuestionModel.find(askedBy);
        } catch (error) {
            console.error(error.message);
            return error;
        }
    },
    AllQuestions: async (agg, options) => {
        try {
            const question = QuestionModel.aggregate(agg);
            const data = await QuestionModel.aggregatePaginate(
                question,
                options
            );
            return data;
        } catch (error) {
            console.error(error.message);
            return error;
        }
    },
};
