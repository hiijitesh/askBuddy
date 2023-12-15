const {
    invalidFieldResponse,
    errorResponse,
    successResponse,
    forbiddenResponse,
} = require("../../utils/errorHandler");

const {
    addComment,
    getComment,
    getUserById,
    editComment,
    getCommentById,
} = require("./commentService");

const controllers = {
    addComment: async (req, res) => {
        try {
            const { comment, questionId, answerId } = req.body;
            const userId = req.user.id;

            if (!userId) {
                return forbiddenResponse(res, {}, "login commentId");
            }
            const userData = await getUserById(userId);

            if (!comment && (!questionId || !answerId)) {
                return invalidFieldResponse(
                    res,
                    {},
                    "provide comment & questionId/answerId"
                );
            }
            const obj = {
                commenterId: userId,
                comment,
                username: userData?.username,
            };
            if (questionId) {
                obj.questionId = questionId;
            }

            if (answerId) {
                obj.answerId = answerId;
            }
            const newComment = await addComment(obj);

            return newComment
                ? successResponse(res, newComment, "you commented on post")
                : errorResponse(res, {}, "couldn't comment");
        } catch (error) {
            console.error(error);
            return errorResponse(res, {}, "something went wrong");
        }
    },

    getAllComment: async (req, res) => {
        try {
            const { questionId, answerId, pageNum, pageSize } = req.body;

            const obj = {};
            if (questionId) {
                obj.questionId = questionId;
            }

            if (answerId) {
                obj.answerId = answerId;
            }
            const allComment = await getComment(pageNum, pageSize, obj);

            return allComment
                ? successResponse(res, { allComment }, "all comment found")
                : errorResponse(res, {}, "couldn't found comment");
        } catch (error) {
            console.error(error);
            return errorResponse(res, {}, "something went wrong");
        }
    },

    updateComment: async (req, res) => {
        try {
            const { commentId, comment } = req.body;
            const userId = req.user.id;

            if (!commentId) {
                return invalidFieldResponse(res, {}, "provide commentId");
            }

            const userComment = await getCommentById(commentId);

            if (!userComment) {
                return errorResponse(res, {}, "comment doesn't exits");
            }

            if (userId?.toString() !== userComment.commenterId?.toString()) {
                return forbiddenResponse(
                    res,
                    {},
                    "you are not authorized to update this comment"
                );
            }

            const updatedComment = await editComment(commentId, comment);
            return updatedComment
                ? successResponse(
                      res,
                      updatedComment,
                      "comment updated successfully"
                  )
                : errorResponse(res, {}, "couldn't update comment");
        } catch (error) {
            console.error(error);
            return errorResponse(res, {}, "something went wrong");
        }
    },
};

module.exports = controllers;
