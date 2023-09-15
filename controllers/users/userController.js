const {
	invalidFieldResponse,
	errorResponse,
	successResponse,
} = require("../../utils/errorHandler");
const { validateEmail, validatePassword } = require("../../utils/validator");
const { registerUser, getUserById } = require("./userService");

const userController = {
	signUp: async (req, res) => {
		try {
			const { name, email, username, password } = req.body;
			if (!name || !email || !username || !password) {
				return invalidFieldResponse(res, "All fields are mandatory!");
			}

			if (!validateEmail(email)) {
				return errorResponse(res, "email is not valid!");
			}
			if (!validatePassword(password)) {
				return errorResponse(res, "password is not valid!");
			}

			// TODO add Encryption
			const userData = { name, email, username };

			const existingUser = await getUserById({ username, email });
			if (existingUser) {
				return errorResponse(
					res,
					username,
					"user already register, please login!"
				);
			}

			const userRegistrationData = await registerUser(userData);

			if (!userRegistrationData) {
				return errorResponse(
					res,
					username,
					"couldn't create user, username and email should be unique!"
				);
			}
			return successResponse(
				res,
				userRegistrationData,
				"user created successfully"
			);
		} catch (error) {
			console.error(error);
		}
	},
};

module.exports = userController;
