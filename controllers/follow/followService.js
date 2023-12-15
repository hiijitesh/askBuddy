const FollowModel = require("../../models/follow");

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

    followService: async (obj) => {
        try {
            const { followerId, questionId, answerId } = obj;
            const data = await FollowModel.findOneAndUpdate(
                { followerId },
                { $set: obj },
                {
                    upsert: true,
                    new: true,
                }
            )
                .select({
                    isFollow: 1,
                })
                .lean();

            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
            return error;
        }
    },
};
