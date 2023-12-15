const { default: mongoose } = require("mongoose");
const {
    invalidFieldResponse,
    errorResponse,
    successResponse,
    forbiddenResponse,
} = require("../../utils/errorHandler");

const { followService, checkFollowing } = require("./followService");

const controllers = {
    followOrUnfollow: async (req, res) => {
        try {
            const { questionId, answerId } = req.body;

            const userId = req.user.id;

            if (!userId) {
                return forbiddenResponse(res, {}, "please login first");
            }

            if (!questionId && !answerId) {
                return invalidFieldResponse(
                    res,
                    {},
                    "provide questionId or answerId"
                );
            }

            const isFollowing = await checkFollowing({
                questionId,
                followerId: userId,
                answerId,
            });

            console.log(isFollowing);

            const followObj = {
                followerId: userId,
                isFollow: !isFollowing,
            };

            if (questionId) {
                followObj.questionId = questionId;
            }

            if (answerId) {
                followObj.answerId = answerId;
            }

            const followData = await followService(followObj);

            return followData
                ? successResponse(res, followData, "followed successfully")
                : errorResponse(res, {}, "couldn't follow ");
        } catch (error) {
            console.error(error);
            return errorResponse(res, {}, "something went wrong!");
        }
    },
};

module.exports = controllers;
