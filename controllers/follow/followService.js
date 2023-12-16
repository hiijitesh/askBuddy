const { FollowModel, QuestionModel, AnsModel } = require("../../models");

module.exports = {
    checkFollowing: async (obj) => {
        try {
            const data = await FollowModel.findOne(obj)
                .select({
                    isFollow: 1,
                })
                .lean();

            return data.isFollow;
        } catch (error) {
            console.error(error);
            return error;
        }
    },

    followService: async (obj, isFollow) => {
        try {
            const data = await FollowModel.findOneAndUpdate(
                obj,
                { $set: { isFollow } },
                {
                    upsert: true,
                    new: true,
                }
            ).lean();

            if (data && data.questionId) {
                await QuestionModel.findOneAndUpdate(
                    { _id: data?.questionId },
                    {
                        $inc: { followCount: data?.isFollow ? 1 : -1 },
                    },
                    { new: true }
                );
            }

            if (data && data?.answerId) {
                await AnsModel.findOneAndUpdate(
                    { _id: data?.answerId },
                    {
                        $inc: { followCount: data?.isFollow ? 1 : -1 },
                    },
                    { new: true }
                );
            }

            return data;
        } catch (error) {
            console.error(error);
            return error;
        }
    },
};
