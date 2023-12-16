const UserModel = require("../../models/user");

module.exports = {
    registerUser: async (user) => {
        try {
            return await UserModel.create(user);
        } catch (error) {
            console.error(error.message);
            return error;
        }
    },
    getUserById: async (userId) => {
        try {
            return await UserModel.findOne({ _id: userId })
                .select("+password")
                .lean()
                .exec();
        } catch (error) {
            console.error(error.message);
            return error;
        }
    },
    updateUser: async (userId, obj) => {
        try {
            return await UserModel.findByIdAndUpdate(
                userId,
                { obj },
                { new: true }
            )
                .lean()
                .exec();
        } catch (error) {
            console.error(error.message);
            return error;
        }
    },
};
