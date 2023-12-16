const bcrypt = require("bcrypt");
const {
    invalidFieldResponse,
    errorResponse,
    successResponse,
    forbiddenResponse,
} = require("../../utils/errorHandler");

const { validateEmail, validatePassword } = require("../../utils/validator");
const { generateToken } = require("../../utils/auth");
const { registerUser, getUserById, updateUser } = require("./userService");

const userController = {
    signup: async (req, res) => {
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

            const hashedPassword = await bcrypt.hash(password, 10);
            const userData = {
                name,
                email,
                username,
                password: hashedPassword,
            };

            const existingUser = await getUserById({ username, email });
            if (existingUser) {
                return errorResponse(
                    res,
                    { username },
                    "user already register, please login!"
                );
            }

            const userRegistrationData = await registerUser(userData);
            if (!userRegistrationData) {
                return errorResponse(
                    res,
                    { username },
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
            return errorResponse(res, {}, "something went wrong!");
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return invalidFieldResponse(
                    res,
                    {},
                    "username and password are mandatory"
                );
            }

            const user = await getUserById({ username });
            if (!user) {
                return errorResponse(res, { username }, "No user founds");
            }

            const matchPassword = await bcrypt.compare(password, user.password);
            if (!matchPassword) {
                return errorResponse(res, {}, "wrong password");
            }

            const access_token = generateToken(user, "access");
            // const refresh_token = generateJWTToken(user, "refresh");

            return successResponse(
                res,
                { access_token },
                "User Login successfully"
            );
        } catch (error) {
            console.error(error);
            return errorResponse(res, {}, "something went wrong!");
        }
    },

    updateUserProfile: async (req, res) => {
        try {
            const { username, email, name } = req.body;

            const userId = req.user.id;

            if (!username || !name || !email) {
                return invalidFieldResponse(
                    res,
                    {},
                    "username, email or name are mandatory"
                );
            }

            const user = await getUserById({ username });
            if (!user) {
                return errorResponse(res, { username }, "No user founds");
            }

            if (user._id.toString() !== userId) {
                return forbiddenResponse(res, {}, "your are not authorized  `");
            }

            const userObj = {
                name,
                email,
                username,
            };

            const updateProfile = await updateUser(userId, userObj);

            return successResponse(
                res,
                updateProfile,
                "User Login successfully"
            );
        } catch (error) {
            console.error(error);
            return errorResponse(res, {}, "something went wrong!");
        }
    },

    getUserById: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return invalidFieldResponse(res, {}, "userId is mandatory");
            }

            const user = await getUserById({ id });
            if (!user) {
                return errorResponse(res, { id }, "No user founds");
            }

            return successResponse(res, user, "User Login successfully");
        } catch (error) {
            console.error(error);
            return errorResponse(res, {}, "something went wrong!");
        }
    },
};

module.exports = userController;
