const UserModel = require("../../models/user");

module.exports = {
	registerUser: async (user) => {
		try {
			return await UserModel.create(user);
		} catch (error) {
			console.error(error.message);
		}
	},
	// signInUser: async (username, password) => {},
	getUserById: async (user) => {
		try {
			return await UserModel.findOne(user);
		} catch (error) {
			console.error(error.message);
		}
	},
};
