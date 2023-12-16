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
            return data;
        } catch (error) {
            console.error(error);
            return error;
        }
    },
};
