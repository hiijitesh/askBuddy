const CommentModel = require("../../models/comment");
const UserModel = require("../../models/user");

module.exports = {
    addComment: async (obj) => {
        try {
            const data = await CommentModel.create(obj);
            return data;
        } catch (error) {
            console.error(error);
            return error;
        }
    },

    getComment: async (pageNum, pageSize, obj) => {
        try {
            pageSize = pageSize || 5;
            pageNum = pageNum || 1;
            const skipPage =
                pageSize > 0 ? parseInt(pageSize) * parseInt(pageNum) : 1;
            return await CommentModel.find(obj)
                .limit(parseInt(pageSize))
                .skip(skipPage)
                .lean()
                .exec();
        } catch (error) {
            console.error(error);
            return error;
        }
    },

    getCommentById: async (id) => {
        try {
            return await CommentModel.findById(id).lean().exec();
        } catch (error) {
            console.error(error);
            return error;
        }
    },

    getUserById: async (id) => {
        try {
            return await UserModel.findById(id)
                .select("-password")
                .lean()
                .exec();
        } catch (error) {
            console.error(error.message);
            return error;
        }
    },

    editComment: async (commentId, comment) => {
        try {
            return await CommentModel.findByIdAndUpdate(
                commentId,
                { $set: { comment } },
                {
                    new: true,
                }
            )
                .lean()
                .exec();
        } catch (error) {
            console.error(error.message);
            return error;
        }
    },
};
