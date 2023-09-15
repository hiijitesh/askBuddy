const {
	invalidFieldResponse,
	errorResponse,
	successResponse,
	forbiddenResponse,
} = require("../../utils/errorHandler");

const { createQuestion, updateQuestion } = require("./questionService");
const { getUserById } = require("../users/userService");
const { default: mongoose } = require("mongoose");

const controllers = {
	addQuestion: async (req, res) => {
		try {
			const { title, body, tags } = req.body;
			const askedBy = req.userInfo.id;

			if (!title || !body || !tags?.length < 0 || !askedBy) {
				return invalidFieldResponse(res, "all filed are mandatory");
			}
			const questionData = {
				title,
				body,
				tags,
				askedBy,
			};
			const question = await createQuestion(questionData);

			if (!question) {
				return errorResponse(res, "couldn't add question please try again!");
			}

			return successResponse(res, question, "Your Question was added");
		} catch (error) {
			console.error(error.message);
		}
	},

	editQuestion: async (req, res) => {
		try {
			const { questionId, title, body, tags } = req.body;
			const userId = req.userInfo.id;

			const user = await getUserById(new mongoose.Types.ObjectId(userId));
			console.log(user);

			if (userId.toString() !== user._id.toString()) {
				return forbiddenResponse(
					res,
					"you are not authorized to edit this question"
				);
			}

			const questionData = {
				title,
				body,
				tags,
			};

			const question = await updateQuestion(questionId, questionData);

			if (!question) {
				return errorResponse(res, "couldn't update question");
			}

			return successResponse(res, question, "question updated successfully!");
		} catch (error) {
			console.error(error.message);
		}
	},
};

module.exports = controllers;
